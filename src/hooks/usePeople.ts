import { getPersonDetails } from "@/api/tmdb.movies";
import type { PeopleDetails } from "@/api/tmdb.types";
import { useEffect, useState } from "react";

export function usePerson(personId: string | undefined) {
  const [person, setPerson] = useState<PeopleDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!personId) return;

    const fetchPerson = async () => {
      setLoading(true);
      try {
        const personNumberId = Number(personId); // 🔹 conversion string → number
        if (Number.isNaN(personNumberId)) {
          throw new Error("ID invalide");
        }
        const data = await getPersonDetails(personNumberId);
        setPerson(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer les informations de la personne");
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [personId]);

  return { person, loading, error };
}
