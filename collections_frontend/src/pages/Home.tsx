// src/pages/Home.tsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UploadForm from "../components/UploadForm";
import ImageList from "../components/ImageList";

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar
          onSearchChange={setSearchText}
          onUploadClick={() => setShowUploadModal(true)}
        />

        <div style={{ padding: "1rem", overflowY: "auto" }}>
          <ImageList
            search={searchText}
            allowAssignment={true}
            allowCollectionFilter={true}
          />
        </div>

        {showUploadModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => setShowUploadModal(false)}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                minWidth: "400px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Upload Image</h2>
              <UploadForm onSuccess={() => setShowUploadModal(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
