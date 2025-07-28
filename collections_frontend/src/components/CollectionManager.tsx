// src/components/CollectionManager.tsx
import React, { useState } from "react";
import axios from "axios";

export interface Collection {
  id: number;
  name: string;
  customer: string;
}

interface Props {
  existingCollection?: Collection;
  onSuccess?: () => void;
}

const CollectionManager: React.FC<Props> = ({
  existingCollection,
  onSuccess,
}) => {
  const [name, setName] = useState(existingCollection?.name || "");
  const [customer, setCustomer] = useState(existingCollection?.customer || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (existingCollection) {
        await axios.put(
          `http://localhost:5000/api/collections/${existingCollection.id}`,
          {
            name,
            customer,
          }
        );
        alert("Collection updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/collections", {
          name,
          customer,
        });
        alert("Collection created successfully");
      }
      onSuccess?.();
      setName("");
      setCustomer("");
    } catch (error) {
      console.error("Error saving collection:", error);
      alert("Failed to save collection");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{existingCollection ? "Edit" : "Create"} Collection</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        placeholder="Customer"
      />
      <button type="submit">{existingCollection ? "Update" : "Create"}</button>
    </form>
  );
};

export default CollectionManager;
