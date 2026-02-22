import React from "react";
import { NodeProps } from "reactflow";
import BaseNode from "./BaseNode";

export const PromptNode = ({ id }: NodeProps): JSX.Element => {
  return (
    <BaseNode
      id={id}
      title="Prompt Template"
      icon="💬"
      inputs={[{ name: "template" }, { name: "context" }]}
      outputs={[{ name: "output" }]}
      headerClass="header-prompt"
    >
      <p className="node-info-text">Combines template with context</p>
    </BaseNode>
  );
};
