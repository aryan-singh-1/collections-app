// src/components/CollectionList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Collection {
  id: number;
  name: string;
  customer: string;
}

const CollectionList: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const res = await axios.get<Collection[]>(
        `${import.meta.env.VITE_API_BASE}/api/collections`
      );
      setCollections(res.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const deleteCollection = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this collection?"))
      return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE}/api/collections/${id}`);
      fetchCollections();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div>
      <h2>All Collections</h2>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Collection Name
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Customer
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => (
            <tr key={collection.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {collection.name}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {collection.customer}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <button onClick={() => alert("Edit form coming soon")}>
                  Edit
                </button>{" "}
                <button onClick={() => deleteCollection(collection.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollectionList;
