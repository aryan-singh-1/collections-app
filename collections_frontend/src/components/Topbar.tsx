// src/components/Topbar.tsx
import React from "react";

interface Props {
  onSearchChange: (val: string) => void;
  onUploadClick: () => void;
}

const Topbar: React.FC<Props> = ({ onSearchChange, onUploadClick }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        background: "#f5f5f5",
      }}
    >
      <input
        type="text"
        placeholder="Search images..."
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ width: "70%", padding: "0.5rem" }}
      />
      <button onClick={onUploadClick} style={{ padding: "0.5rem 1rem" }}>
        Upload
      </button>
    </div>
  );
};

export default Topbar;
