import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [showCollectionsDropdown, setShowCollectionsDropdown] = useState(false);
  const location = useLocation();

  const linkStyle: React.CSSProperties = {
    textDecoration: "none",
    color: "black",
  };

  const activeStyle: React.CSSProperties = {
    fontWeight: "bold",
    backgroundColor: "#cce4ff",
    padding: "0.2rem 0.5rem",
    borderRadius: "4px",
    color: "#004a99",
  };

  const isCollectionsActive = location.pathname === "/collections";

  return (
    <div
      style={{
        width: "200px",
        background: "#eee",
        padding: "1rem",
        height: "100vh",
      }}
    >
      <h2 style={{color: "#004a99",}}>Admin</h2>
      <nav>
        <p>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
          >
            Home
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/images"
            style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
          >
            All Images
          </NavLink>
        </p>

        <p
          onClick={() => setShowCollectionsDropdown(!showCollectionsDropdown)}
          style={{
            cursor: "pointer",
            ...(isCollectionsActive ? activeStyle : linkStyle),
            transition: "0.2s",
          }}
        >
          Collections ▾
        </p>

        {showCollectionsDropdown && (
          <div style={{ marginLeft: "1rem" }}>
            <p>
              <NavLink
                to="/collections?action=create"
                style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
              >
                ➕ Create Collection
              </NavLink>
            </p>
            <p>
              <NavLink
                to="/collections?action=view"
                style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
              >
                📄 Existing Collections
              </NavLink>
            </p>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
