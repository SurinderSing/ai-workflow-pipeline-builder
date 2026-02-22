import React, { useState } from "react";
import { useStore, StoreState } from "./store";
import { shallow } from "zustand/shallow";

const selector = (state: StoreState) => ({
  nodes: state.nodes,
  edges: state.edges,
});

interface BaseModalData {
  type: "success" | "error";
}

interface SuccessModalData extends BaseModalData {
  type: "success";
  data: {
    num_nodes: number;
    num_edges: number;
    is_dag: boolean;
  };
}

interface ErrorModalData extends BaseModalData {
  type: "error";
  message: string;
}

type ModalData = SuccessModalData | ErrorModalData | null;

export const SubmitButton = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>(null);
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    setModalData(null);

    try {
      const response = await fetch(
        "https://ai-workflow-pipeline-builder.onrender.com/pipelines/parse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nodes, edges }),
        },
      );

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
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      setModalData({ type: "error", message });
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
