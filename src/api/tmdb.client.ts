import { TMDB_CONFIG } from "./tmdb.config";

type FetchOptions = RequestInit & {
  params?: Record<string, string | number>;
};

export async function tmdbFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const url = new URL(`${TMDB_CONFIG.BASE_URL}${endpoint}`);

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers: {
      Authorization: `Bearer ${TMDB_CONFIG.TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`);
  }

  return response.json();
}
