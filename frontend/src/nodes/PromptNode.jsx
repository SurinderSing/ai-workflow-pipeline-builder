// PromptNode.jsx

import BaseNode from "./BaseNode";

export const PromptNode = ({ id }) => {
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
