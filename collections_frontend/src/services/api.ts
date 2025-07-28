// src/services/api.ts
import axios from "axios";

import type { Image } from "../types"; // ✅ Correct

export const fetchImages = () => {
  return axios.get<Image[]>(`${import.meta.env.VITE_API_BASE}/api/images`);
};
