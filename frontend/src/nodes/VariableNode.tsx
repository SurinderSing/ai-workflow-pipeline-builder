import React, { useState, ChangeEvent } from "react";
import { NodeProps } from "reactflow";
import BaseNode from "./BaseNode";

export interface VariableNodeData extends Record<string, unknown> {
  value?: string;
}

export const VariableNode = ({
  id,
  data,
}: NodeProps<VariableNodeData>): JSX.Element => {
  const [value, setValue] = useState<string>(data?.value || "");

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
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
