// submit.js

import { useState } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    setIsLoading(true);
    setModalData(null);

    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error (${response.status}): ${errorText}`);
      }

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error("Invalid JSON response from server");
      }

      setModalData({ type: "success", data: result });
    } catch (error) {
      setModalData({ type: "error", message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="submit-container">
        <button
          className="submit-btn"
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Pipeline"}
        </button>
      </div>

      {modalData && (
        <div className="modal-overlay" onClick={() => setModalData(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {modalData.type === "success" ? "Pipeline Analysis" : "Error"}
              </h3>
              <button
                className="modal-close"
                onClick={() => setModalData(null)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              {modalData.type === "error" ? (
                <div className="modal-error">
                  <span className="error-icon">⚠️</span>
                  <p>{modalData.message}</p>
                </div>
              ) : (
                <div className="modal-stats">
                  <div className="stat-card">
                    <span className="stat-label">Nodes</span>
                    <span className="stat-value">
                      {modalData.data.num_nodes}
                    </span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Edges</span>
                    <span className="stat-value">
                      {modalData.data.num_edges}
                    </span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Is DAG?</span>
                    <span
                      className={`stat-value ${modalData.data.is_dag ? "success-text" : "error-text"}`}
                    >
                      {modalData.data.is_dag ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
