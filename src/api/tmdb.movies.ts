import type {
  CastCredit,
  CombinedCreditsResponse,
  CrewCredit,
  FilmographyItem,
  Movie,
  MovieCredits,
  MovieVideo,
  MovieVideosResponse,
  PeopleDetails,
  PeopleDetailsResponse,
} from "./tmdb.types";
import { tmdbFetch } from "./tmdbFetch";

export async function getPopularMovies(): Promise<Movie[]> {
  try {
    const data = await tmdbFetch<{ results: Movie[] }>("movie/popular", {
      params: { language: "fr-FR", page: 1 },
    });
    return data?.results ?? []; // fallback à []
  } catch (err) {
    console.error("Erreur TMDB:", err);
    return [];
  }
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  try {
    const data = await tmdbFetch<{ results: Movie[] }>("movie/top_rated", {
      params: { language: "fr-FR", page: 1 },
    });
    return data?.results ?? [];
  } catch (err) {
    console.error("Erreur TMDB:", err);
    return [];
  }
}

export async function getMovieCredits(movieId: number): Promise<MovieCredits> {
  try {
    const data = await tmdbFetch<MovieCredits>(`movie/${movieId}/credits`, {
      params: { language: "fr-FR" },
    });
    return data ?? { id: movieId, cast: [], crew: [] }; // ← ici
  } catch (err) {
    console.error("Erreur TMDB:", err);
    return { id: movieId, cast: [], crew: [] }; // fallback sûr
  }
}

export async function getMovieVideos(
  movieId: number,
): Promise<MovieVideosResponse> {
  try {
    // On récupère la réponse complète avec results
    const data = await tmdbFetch<{ id: number; results: MovieVideo[] }>(
      `movie/${movieId}/videos`,
      {
        params: { language: "en-US" },
      },
    );
    console.log("Data from TMDB:", data);

    // Renvoie la réponse typée
    return {
      id: movieId,
      results: data?.results ?? [],
    };
  } catch (err) {
    console.error("Erreur TMDB:", err);
    // Même format de retour en cas d'erreur
    return {
      id: movieId,
      results: [],
    };
  }
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  try {
    const data = await tmdbFetch<{ results: Movie[] }>("movie/upcoming", {
      params: { language: "fr-FR", page: 1 },
    });
    return data?.results ?? [];
  } catch (err) {
    console.error("Erreur TMDB:", err);
    return [];
  }
}

export async function getMovieById(id: string): Promise<Movie> {
  return tmdbFetch<Movie>(`movie/${id}`, {
    params: { language: "fr-FR" },
  });
}

export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const data = await tmdbFetch<{ results: Movie[] }>("search/movie", {
      params: { language: "fr-FR", query, page: 1, include_adult: false },
    });
    return data?.results ?? [];
  } catch (err) {
    console.error("Erreur TMDB:", err);
    return [];
  }
}

export async function getPersonDetails(
  personId: number,
): Promise<PeopleDetails> {
  const data = await tmdbFetch<PeopleDetailsResponse>(`/person/${personId}?`, {
    params: { language: "fr-FR" },
  });

  return {
    id: data.id,
    name: data.name,
    biography: data.biography,
    profile_path: data.profile_path,
    also_known_as: data.also_known_as,
    gender: data.gender === 1 ? "Femme" : "Homme",
    birthday: data.birthday
      ? new Date(data.birthday).toLocaleDateString("fr-FR")
      : null,
    deathday: data.deathday
      ? new Date(data.deathday).toLocaleDateString("fr-FR")
      : null,
    place_of_birth: data.place_of_birth,
  };
}

//filmographie

export async function getPersonCombinedCredits(
  personId: number,
): Promise<CombinedCreditsResponse> {
  return tmdbFetch<CombinedCreditsResponse>(
    `person/${personId}/combined_credits`,
    { params: { language: "fr-FR" } },
  );
}

export function mapCastToFilmography(credit: CastCredit): FilmographyItem {
  return {
    id: credit.id,
    credit_id: credit.credit_id,
    media_type: credit.media_type,
    title: credit.title ?? credit.name ?? "Titre inconnu",
    role: credit.character,
    poster_path: credit.poster_path,
    date: credit.release_date ?? credit.first_air_date,
  };
}

export function mapCrewToFilmography(credit: CrewCredit): FilmographyItem {
  return {
    id: credit.id,
    credit_id: credit.credit_id,
    media_type: credit.media_type,
    title: credit.title ?? credit.name ?? "Titre inconnu",
    role: credit.job,
    poster_path: credit.poster_path,
    date: credit.release_date ?? credit.first_air_date,
  };
}

export function getMediaDate(item: FilmographyItem): number {
  return item.date ? new Date(item.date).getTime() : 0;
}
