// DisplayNode.jsx

import BaseNode from "./BaseNode";

export const DisplayNode = ({ id }) => {
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
