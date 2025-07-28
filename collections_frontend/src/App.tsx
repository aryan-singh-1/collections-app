// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import Home from "./pages/Home";
import AllImages from "./pages/AllImages";
import CollectionList from "./components/CollectionList";
import CollectionManager from "./components/CollectionManager";
import Sidebar from "./components/Sidebar";

const CollectionsRouter = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
        {action === "create" ? (
          <CollectionManager
            onSuccess={() =>
              (window.location.href = "/collections?action=view")
            }
          />
        ) : (
          <CollectionList />
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/images" element={<AllImages />} />
        <Route path="/collections" element={<CollectionsRouter />} />
      </Routes>
    </Router>
  );
};

export default App;
