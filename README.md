# VectorShift Technical Assessment

This repository contains the completed frontend and backend implementation for the VectorShift technical assessment. The project features an interactive, node-based pipeline editor built with React on the frontend and a FastAPI backend for pipeline parsing and analysis.

## Features Implemented

### 1. Node Abstraction (`frontend/src/nodes/BaseNode.jsx`)

A robust, generic `BaseNode` component encapsulates common node functionality (headers, styling, connection handles). This dramatically reduces boilerplate code for creating new nodes.

Using this abstraction, 9 nodes are implemented:

- **Input Node**: Defines pipeline inputs.
- **Output Node**: Defines pipeline outputs.
- **LLM Node**: Large Language Model step.
- **Text Node**: Advanced text area field.
- **Prompt Node**: Combines templates with context.
- **Variable Node**: Single variable input.
- **Transform Node**: Data transformation operations (e.g., Uppercase).
- **DataSource Node**: Connect to DB, API, etc.
- **Display Node**: Pipeline visual output.

### 2. Styling

The entire frontend application features a premium, modern design system:

- Centralized CSS in `frontend/src/index.css`.
- Distinct, vibrant gradient headers for each node type to aid visual parsing.
- Hover states, micro-animations, and elevated box-shadows on drag interactions.
- A consistent, clean styling for input fields, text areas, and node handles.

### 3. Dynamic Text Node Logic

The `Text` node includes advanced logic for a better user experience:

- **Auto-resizing**: The textarea height and the node width dynamically adjust as the user types.
- **Variable Extraction**: The component automatically regex-parses text as it is typed. Whenever a valid variable is surrounded by double curly braces (e.g., `{{ input }}`), a new dynamic handle is automatically generated and positioned on the left side of the node.
  _Note: A bug involving JavaScript global regex `lastIndex` persisting between renders was specifically patched to ensure rock-solid variable extraction._

### 4. Backend Integration & Analysis Modal

The frontend seamlessly integrates with the FastAPI backend:

- The **Submit Pipeline** button gathers all current nodes and edges from the Zustand store.
- It sends a `POST` request to the backend's `/pipelines/parse` endpoint (`backend/main.py`).
- The backend parses the data and uses Kahn's algorithm to determine if the pipeline is a Directed Acyclic Graph (DAG).
- An **animated Analysis Modal** on the frontend displays the parsed results (Number of Nodes, Number of Edges, and DAG status).
- Errors from the backend (e.g., server unreachable) are properly caught and displayed within the modal.

---

## Architecture & Libraries

### Frontend

- **React Flow**: Core library powering the drag-and-drop canvas, nodes, and edges.
- **Zustand**: Lightweight global state management used to store node positioning and edge connections.
- **CSS3 Vanilla**: Used heavily for all animations, flex/grid layouts, and responsive components without relying on heavy external UI frameworks.

### Backend

- **FastAPI**: High-performance Python framework for building the API endpoints.
- **Pydantic**: Data validation and object mapping for pipeline requests.

---

## Getting Started

To run the application, you will need to start both the Python backend and the React frontend.

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:

   ```bash
   cd backend
   ```

2. (Optional but recommended) Create and activate a virtual environment.

3. Install the dependencies (assuming FastAPI and Uvicorn are needed):

   ```bash
   pip install fastapi uvicorn pydantic
   ```

4. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be running at `http://localhost:8000`.

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   yarn start
   # or
   npm start
   ```
   The application will automatically open in your browser at `http://localhost:3000`.

### 3. Testing the Application

1. Ensure both the frontend (`localhost:3000`) and the backend (`localhost:8000`) are running.
2. Drag and drop nodes from the top toolbar onto the canvas.
3. Type `{{ variable_name }}` inside a Text node to see dynamic handles appear.
4. Connect handles between nodes to create a pipeline.
5. Click **Submit Pipeline** at the bottom of the screen to send the graph to the backend and see the analysis modal.
