// textNode.js

import { useState, useRef, useCallback } from "react";
import BaseNode from "./BaseNode";

const MIN_WIDTH = 200;
const MAX_WIDTH = 600;

const extractVariables = (text) => {
  const variables = new Set();
  const regex = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    variables.add(match[1]);
  }
  return Array.from(variables).sort();
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [nodeWidth, setNodeWidth] = useState(MIN_WIDTH);
  const textareaRef = useRef(null);

  const variables = extractVariables(currText);

  const dynamicInputs = variables.map((varName) => ({
    name: `var_${varName}`,
  }));

  const handleTextChange = useCallback((e) => {
    const newText = e.target.value;
    setCurrText(newText);

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;

      const lines = newText.split("\n");
      const longestLine = lines.reduce(
        (max, line) => Math.max(max, line.length),
        0,
      );
      const estimatedWidth = Math.min(
        MAX_WIDTH,
        Math.max(MIN_WIDTH, longestLine * 8 + 40),
      );
      setNodeWidth(estimatedWidth);
    }
  }, []);

  return (
    <div style={{ minWidth: `${nodeWidth}px`, maxWidth: `${MAX_WIDTH}px` }}>
      <BaseNode
        id={id}
        title="Text"
        icon="📝"
        inputs={dynamicInputs}
        outputs={[{ name: "output" }]}
        headerClass="header-text"
      >
        <div className="node-field">
          <label className="node-field-label">Text</label>
          <textarea
            ref={textareaRef}
            className="text-node-textarea"
            value={currText}
            onChange={handleTextChange}
            placeholder="Type text here... Use {{variable}} for dynamic inputs"
            rows={3}
          />
        </div>
        {variables.length > 0 && (
          <div style={{ marginTop: "6px" }}>
            <span className="node-field-label">Variables</span>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                marginTop: "4px",
              }}
            >
              {variables.map((varName) => (
                <span
                  key={varName}
                  style={{
                    padding: "2px 8px",
                    background: "#ede9fe",
                    color: "#6366f1",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: 500,
                  }}
                >
                  {varName}
                </span>
              ))}
            </div>
          </div>
        )}
      </BaseNode>
    </div>
  );
};
