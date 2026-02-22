import React, { useState, ChangeEvent } from "react";
import { NodeProps } from "reactflow";
import BaseNode from "./BaseNode";

export interface OutputNodeData extends Record<string, unknown> {
  outputName?: string;
  outputType?: string;
}

export const OutputNode = ({
  id,
  data,
}: NodeProps<OutputNodeData>): JSX.Element => {
  const [currName, setCurrName] = useState<string>(
    data?.outputName || id.replace("customOutput-", "output_"),
  );
  const [outputType, setOutputType] = useState<string>(
    data?.outputType || "Text",
  );

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      inputs={[{ name: "value" }]}
      outputs={[]}
      headerClass="header-output"
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
          value={outputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
