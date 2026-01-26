import type { Movie } from "@/api/tmdb.types";
import { useEffect, useState } from "react";

export function useMovies(fetchFn: () => Promise<Movie[]>) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFn()
      .then(setMovies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [fetchFn]);

  return { movies, loading, error };
}
