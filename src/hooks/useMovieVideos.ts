import { getMovieVideos } from "@/api/tmdb.movies";
import type { MovieVideo } from "@/api/tmdb.types";
import { useEffect, useState } from "react";

export function useMovieVideos(movieId?: number) {
  const [videos, setVideos] = useState<MovieVideo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (movieId === undefined) return;
    console.log("movieId undefined, rien à fetch");
    const id = movieId;
    let cancelled = false;

    async function fetchVideos() {
      console.log("Appel de getMovieVideos pour movieId:", movieId);
      setLoading(true);
      try {
        const res = await getMovieVideos(id);
        if (!cancelled) {
          console.log("Résultat getMovieVideos:", res);
          setVideos(res.results ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Erreur inconnue");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchVideos();

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  return { videos, loading, error };
}
