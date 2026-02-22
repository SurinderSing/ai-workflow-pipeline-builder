// TransformNode.jsx

import { useState } from "react";
import BaseNode from "./BaseNode";

const TRANSFORM_OPTIONS = [
  "Uppercase",
  "Lowercase",
  "Trim",
  "Reverse",
  "JSON Parse",
];

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(
    data?.transformType || "Uppercase",
  );

  const handleTypeChange = (e) => {
    setTransformType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="🔄"
      inputs={[{ name: "input" }]}
      outputs={[{ name: "output" }]}
      headerClass="header-transform"
    >
      <div className="node-field">
        <label className="node-field-label">Operation</label>
        <select
          className="node-field-select"
          value={transformType}
          onChange={handleTypeChange}
        >
          {TRANSFORM_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </BaseNode>
  );
};
