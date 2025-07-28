// Updated ImageList.tsx with support for:
// - Search (tags > description > name)
// - Collection filter
// - Grouped display of images by collection

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Image {
  id: number;
  name: string;
  description: string;
  tags: string;
  filename: string;
  collection_id?: number;
}

interface Collection {
  id: number;
  name: string;
}

interface Props {
  search?: string;
  allowAssignment?: boolean;
  allowCollectionFilter?: boolean;
}

const ImageList: React.FC<Props> = ({
  search = "",
  allowAssignment = false,
  allowCollectionFilter = false,
}) => {
  const [images, setImages] = useState<Image[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedImageIds, setSelectedImageIds] = useState<number[]>([]);
  const [filterCollectionId, setFilterCollectionId] = useState<number | "all">(
    "all"
  );

  useEffect(() => {
    fetchImages();
    fetchCollections();
  }, []);

  const fetchImages = async () => {
    const res = await axios.get<Image[]>("http://localhost:5000/api/images");
    setImages(res.data);
    setSelectedImageIds([]);
  };

  const fetchCollections = async () => {
    const res = await axios.get<Collection[]>(
      "http://localhost:5000/api/collections"
    );
    setCollections(res.data);
  };

  const toggleSelect = (id: number) => {
    setSelectedImageIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const assignToCollection = async (collectionId: number) => {
    if (!selectedImageIds.length) return;
    try {
      await axios.post(
        "http://localhost:5000/api/images/assign-to-collection",
        {
          imageIds: selectedImageIds,
          collectionId,
        }
      );
      alert("Images assigned successfully!");
      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Assignment failed.");
    }
  };

  const filteredImages = images.filter((img) => {
    if (
      filterCollectionId !== "all" &&
      (img.collection_id ?? null) !== filterCollectionId
    )
      return false;

    if (!search) return true;
    const s = search.toLowerCase();
    return (
      img.tags.toLowerCase().includes(s) ||
      img.description.toLowerCase().includes(s) ||
      img.name.toLowerCase().includes(s)
    );
  });

  const groupedByCollection: Record<string, Image[]> = {};
  filteredImages.forEach((img) => {
    const group = img.collection_id
      ? collections.find((c) => c.id === img.collection_id)?.name ||
        "Unassigned"
      : "Unassigned";
    if (!groupedByCollection[group]) groupedByCollection[group] = [];
    groupedByCollection[group].push(img);
  });

  return (
    <div>
      {(allowAssignment || allowCollectionFilter) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          {allowCollectionFilter && (
            <div>
              <label>Filter by Collection:</label>
              <select
                onChange={(e) =>
                  setFilterCollectionId(
                    e.target.value === "all" ? "all" : Number(e.target.value)
                  )
                }
                value={filterCollectionId}
              >
                <option value="all">All Collections</option>
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {allowAssignment && selectedImageIds.length > 0 && (
            <div>
              <label>Assign selected to:</label>
              <select
                onChange={(e) => assignToCollection(Number(e.target.value))}
                defaultValue=""
              >
                <option value="" disabled>
                  -- Select Collection --
                </option>
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {Object.entries(groupedByCollection).map(([collectionName, imgs]) => (
        <div key={collectionName} style={{ marginBottom: "2rem" }}>
          <h3>{collectionName}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {imgs.map((img) => (
              <div
                key={img.id}
                style={{ border: "1px solid #ccc", padding: "0.5rem" }}
              >
                {allowAssignment && (
                  <input
                    type="checkbox"
                    checked={selectedImageIds.includes(img.id)}
                    onChange={() => toggleSelect(img.id)}
                  />
                )}
                <img
                  src={`http://localhost:5000/uploads/${img.filename}`}
                  alt={img.name}
                  width="100"
                />
                <p>{img.name}</p>
                <small>{img.description}</small>
                <p>Tags: {img.tags}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
