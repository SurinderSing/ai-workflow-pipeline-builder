from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NodeData(BaseModel):
    id: str
    type: Optional[str] = None
    position: Optional[dict] = None
    data: Optional[dict] = None


class EdgeData(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class PipelineRequest(BaseModel):
    nodes: List[NodeData] = []
    edges: List[EdgeData] = []


def is_dag(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    node_ids = {node.id for node in nodes}

    if len(node_ids) == 0:
        return True

    adjacency: dict[str, list[str]] = {node_id: [] for node_id in node_ids}
    in_degree: dict[str, int] = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        if edge.source not in node_ids or edge.target not in node_ids:
            continue
        adjacency[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    queue: list[str] = [nid for nid, deg in in_degree.items() if deg == 0]
    processed = 0

    while queue:
        current = queue.pop(0)
        processed += 1
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return processed == len(node_ids)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(request: PipelineRequest):
    num_nodes = len(request.nodes)
    num_edges = len(request.edges)
    dag = is_dag(request.nodes, request.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag,
    }
