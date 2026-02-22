import React, { useState, ChangeEvent } from "react";
import { NodeProps } from "reactflow";
import BaseNode from "./BaseNode";

const TRANSFORM_OPTIONS: string[] = [
  "Uppercase",
  "Lowercase",
  "Trim",
  "Reverse",
  "JSON Parse",
];

export interface TransformNodeData extends Record<string, unknown> {
  transformType?: string;
}

export const TransformNode = ({
  id,
  data,
}: NodeProps<TransformNodeData>): JSX.Element => {
  const [transformType, setTransformType] = useState<string>(
    data?.transformType || "Uppercase",
  );

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
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
