import { tmdbClient } from "@/api/tmdb.client";
import type { AxiosError, AxiosRequestConfig } from "axios";

export async function tmdbFetch<T>(
  endpoint: string,
  options: AxiosRequestConfig = {},
): Promise<T> {
  try {
    const response = await tmdbClient.get<T>(endpoint, options);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(`TMDB error: ${error.response?.status || error.message}`);
  }
}
