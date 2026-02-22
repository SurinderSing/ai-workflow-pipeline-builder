import React, { useState, ChangeEvent } from "react";
import { NodeProps } from "reactflow";
import BaseNode from "./BaseNode";

export interface InputNodeData extends Record<string, unknown> {
  inputName?: string;
  inputType?: string;
}

export const InputNode = ({
  id,
  data,
}: NodeProps<InputNodeData>): JSX.Element => {
  const [currName, setCurrName] = useState<string>(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useState<string>(data?.inputType || "Text");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      inputs={[]}
      outputs={[{ name: "value" }]}
      headerClass="header-input"
    >
      <div className="node-field">
        <label className="node-field-label">Name</label>
        <input
          className="node-field-input"
          type="text"
          value={currName}
          onChange={handleNameChange}
        />
      </div>
      <div className="node-field">
        <label className="node-field-label">Type</label>
        <select
          className="node-field-select"
          value={inputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
