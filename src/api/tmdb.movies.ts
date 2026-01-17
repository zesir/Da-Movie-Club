import { tmdbFetch } from "./tmdb.client";
import type { Movie, PaginatedResponse } from "./tmdb.types";

export function getPopularMovies(page = 1) {
  return tmdbFetch<PaginatedResponse<Movie>>("/movie/popular", {
    params: { page },
  });
}

export function getMovieById(id: number) {
  return tmdbFetch<Movie>(`/movie/${id}`);
}
