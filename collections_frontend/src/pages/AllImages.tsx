// src/pages/AllImages.tsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ImageList from "../components/ImageList";
import UploadModal from "../components/UploadModal";

const AllImages: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
        <ImageList
          search=""
          allowAssignment={true}
          allowCollectionFilter={true}
        />
        <UploadModal
          visible={showUploadModal}
          onClose={() => setShowUploadModal(false)}
        />
      </div>
    </div>
  );
};

export default AllImages;
