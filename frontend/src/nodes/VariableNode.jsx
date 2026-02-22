// VariableNode.jsx

import { useState } from "react";
import BaseNode from "./BaseNode";

export const VariableNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || "");

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Variable"
      icon="🔤"
      inputs={[]}
      outputs={[{ name: "value" }]}
      headerClass="header-variable"
    >
      <div className="node-field">
        <label className="node-field-label">Value</label>
        <input
          className="node-field-input"
          type="text"
          value={value}
          onChange={handleValueChange}
          placeholder="Enter value..."
        />
      </div>
    </BaseNode>
  );
};
