import { Handle, Position } from "reactflow";

const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  children,
  icon,
  headerClass,
}) => {
  const inputCount = inputs.length;
  const outputCount = outputs.length;

  const headerClassName = `base-node-header${headerClass ? ` ${headerClass}` : ""}`;

  return (
    <div className="base-node">
      <div className={headerClassName}>
        {icon && <span className="base-node-icon">{icon}</span>}
        <span className="base-node-title">{title}</span>
      </div>
      <div className="base-node-content">{children}</div>
      {inputs.map((input, index) => (
        <Handle
          key={`input-${input.name}`}
          type="target"
          position={Position.Left}
          id={input.name}
          style={{ top: `${((index + 1) / (inputCount + 1)) * 100}%` }}
          className="base-node-handle base-node-handle-input"
        />
      ))}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${output.name}`}
          type="source"
          position={Position.Right}
          id={output.name}
          style={{ top: `${((index + 1) / (outputCount + 1)) * 100}%` }}
          className="base-node-handle base-node-handle-output"
        />
      ))}
    </div>
  );
};

export default BaseNode;
