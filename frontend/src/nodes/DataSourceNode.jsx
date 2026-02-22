// DataSourceNode.jsx

import { useState } from "react";
import BaseNode from "./BaseNode";

const SOURCE_OPTIONS = ["Database", "API", "File", "Cache"];

export const DataSourceNode = ({ id, data }) => {
  const [sourceType, setSourceType] = useState(data?.sourceType || "Database");

  const handleTypeChange = (e) => {
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
