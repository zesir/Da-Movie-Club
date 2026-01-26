import {
  getPersonCombinedCredits,
  mapCastToFilmography,
  mapCrewToFilmography,
} from "@/api/tmdb.movies";
import type { FilmographyItem } from "@/api/tmdb.types";
import { useEffect, useState } from "react";

export function usePersonFilmography(id: string | undefined) {
  const [cast, setCast] = useState<FilmographyItem[]>([]);
  const [crew, setCrew] = useState<FilmographyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchFilmo = async () => {
      setLoading(true);
      setError(null);

      try {
        const personId = Number(id);
        if (Number.isNaN(personId)) {
          throw new Error("Id invalide");
        }

        const data = await getPersonCombinedCredits(personId);

        const sortByDateDesc = (a: FilmographyItem, b: FilmographyItem) =>
          new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime();

        // 🎭 Cast
        const castItems = [...data.cast.map(mapCastToFilmography)].sort(
          sortByDateDesc,
        );

        // 🎬 Crew (déduplication par média)
        const crewMap = new Map<string, FilmographyItem>();

        data.crew.map(mapCrewToFilmography).forEach((item) => {
          const key = `${item.media_type}-${item.id}`;
          if (!crewMap.has(key)) {
            crewMap.set(key, item);
          }
        });

        const crewItems = [...crewMap.values()].sort(sortByDateDesc);

        setCast(castItems);
        setCrew(crewItems);
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer la filmographie");
      } finally {
        setLoading(false);
      }
    };

    fetchFilmo();
  }, [id]);

  return { cast, crew, loading, error };
}
