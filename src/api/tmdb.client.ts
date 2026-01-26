import axios from "axios";
import { TMDB_CONFIG } from "./tmdb.config";

export const tmdbClient = axios.create({
  baseURL: TMDB_CONFIG.BASE_URL, // base URL de TMDB
  headers: {
    Authorization: `Bearer ${TMDB_CONFIG.TOKEN}`,
    "Content-Type": "application/json",
  },
});
