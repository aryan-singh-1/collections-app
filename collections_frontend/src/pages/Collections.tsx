// src/pages/Collections.tsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import CollectionManager from "../components/CollectionManager";
import CollectionList from "../components/CollectionList.tsx";

const Collections = () => {
  const [params] = useSearchParams();
  const mode = params.get("action");

  return (
    <>
      {mode === "create" && <CollectionManager />}
      {mode === "view" && <CollectionList />}
    </>
  );
};

export default Collections;
