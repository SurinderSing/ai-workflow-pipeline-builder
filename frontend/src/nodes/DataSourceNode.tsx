import React, { useState, ChangeEvent } from "react";
import { NodeProps } from "reactflow";
import BaseNode from "./BaseNode";

const SOURCE_OPTIONS: string[] = ["Database", "API", "File", "Cache"];

export interface DataSourceNodeData extends Record<string, unknown> {
  sourceType?: string;
}

export const DataSourceNode = ({
  id,
  data,
}: NodeProps<DataSourceNodeData>): JSX.Element => {
  const [sourceType, setSourceType] = useState<string>(
    data?.sourceType || "Database",
  );

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSourceType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Data Source"
      icon="🗄️"
      inputs={[{ name: "query" }]}
      outputs={[{ name: "data" }, { name: "metadata" }]}
      headerClass="header-datasource"
    >
      <div className="node-field">
        <label className="node-field-label">Source</label>
        <select
          className="node-field-select"
          value={sourceType}
          onChange={handleTypeChange}
        >
          {SOURCE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </BaseNode>
  );
};
