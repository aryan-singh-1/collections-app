// src/services/api.ts
import axios from "axios";

import type { Image } from "../types"; // ✅ Correct

export const fetchImages = () => {
  return axios.get<Image[]>("http://localhost:5000/api/images");
};
