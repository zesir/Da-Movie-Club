import type { TMDBMovieStatus } from "@/api/tmdb.types";

const STATUS_MAP: Record<Exclude<TMDBMovieStatus, "Released">, string> = {
  Rumored: "Annoncé",
  Planned: "Planifié",
  "In Production": "En production",
  "Post Production": "En post production",
  Canceled: "Annulé",
};

export function getStatus(
  status?: TMDBMovieStatus,
  releaseDate?: string,
): string | undefined {
  if (!status) return undefined;

  if (status === "Released" && releaseDate) {
    const releaseDateFr = new Date(releaseDate).toLocaleDateString("fr-FR");
    return `Sortie le ${releaseDateFr}`;
  }

  return STATUS_MAP[status as Exclude<TMDBMovieStatus, "Released">];
}
