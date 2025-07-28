// src/components/UploadModal.tsx
import React from "react";
import UploadForm from "./UploadForm";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<Props> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{ background: "white", padding: "2rem", borderRadius: "10px" }}
      >
        <h2>Upload Image</h2>
        <UploadForm onSuccess={onClose} />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UploadModal;
