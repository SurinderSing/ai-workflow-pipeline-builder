import React from "react";
import { NodeProps } from "reactflow";
import BaseNode from "./BaseNode";

export const DisplayNode = ({ id }: NodeProps): JSX.Element => {
  return (
    <BaseNode
      id={id}
      title="Display"
      icon="🖥️"
      inputs={[{ name: "content" }]}
      outputs={[]}
      headerClass="header-display"
    >
      <p className="node-info-text">Displays pipeline output</p>
    </BaseNode>
  );
};
