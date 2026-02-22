// llmNode.js

import BaseNode from "./BaseNode";

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      inputs={[{ name: "system" }, { name: "prompt" }]}
      outputs={[{ name: "response" }]}
      headerClass="header-llm"
    >
      <p className="node-info-text">Large Language Model</p>
    </BaseNode>
  );
};
