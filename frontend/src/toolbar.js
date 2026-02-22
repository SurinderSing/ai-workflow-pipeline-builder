// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div className="pipeline-toolbar">
      <span className="pipeline-toolbar-title">Nodes</span>
      <DraggableNode type="customInput" label="Input" />
      <DraggableNode type="llm" label="LLM" />
      <DraggableNode type="customOutput" label="Output" />
      <DraggableNode type="text" label="Text" />
      <DraggableNode type="prompt" label="Prompt" />
      <DraggableNode type="variable" label="Variable" />
      <DraggableNode type="transform" label="Transform" />
      <DraggableNode type="dataSource" label="Data Source" />
      <DraggableNode type="display" label="Display" />
    </div>
  );
};
