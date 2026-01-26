import { getMovieCredits } from "@/api/tmdb.movies";
import type { CastMember, CrewMember } from "@/api/tmdb.types";
import { useEffect, useState } from "react";

export function useMovieCredits(movieId?: number) {
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchCredits = async () => {
      try {
        setLoading(true); // ✅ ok ici
        const data = await getMovieCredits(movieId);
        setCast(data.cast ?? []);
        setCrew(data.crew ?? []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les crédits");
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [movieId]);

  return { cast, crew, loading, error };
}
