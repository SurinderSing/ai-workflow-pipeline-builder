import React, { DragEvent } from "react";

interface DraggableNodeProps {
  type: string;
  label: string;
}

export const DraggableNode = ({
  type,
  label,
}: DraggableNodeProps): JSX.Element => {
  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: string,
  ): void => {
    const appData = { nodeType };
    event.currentTarget.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => {
        event.currentTarget.style.cursor = "grab";
      }}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
