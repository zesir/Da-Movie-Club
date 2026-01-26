//Movie details
export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  tagline?: string;
  video?: boolean;
  genres?: { id: number; name: string }[];
  status?: TMDBMovieStatus;
  budget?: number;
  runtime?: number;
  revenue?: number;
  original_language?: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path?: string | null;
    backdrop_path?: string | null;
  } | null;
};

export type MinimalMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
};
//pour les listes (cards) utilisé dans homePage, resultat de recherche, carroussels
export type MovieListItem = {
  id: number;
  title: string;
  overview: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
};

export type PaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};
// bande annoce, trailer, teaser etc..
export type MovieVideo = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
};

export type MovieVideosResponse = {
  id: number;
  results: MovieVideo[];
};

// Type pour un membre du cast
export type CastMember = {
  adult: boolean;
  gender: number; // 1 = femme, 2 = homme, 0 = inconnu
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

// Type pour un membre du crew
export type CrewMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string | null;
  credit_id: string;
  department: string;
  job: string;
};

// Type pour la réponse complète des credits
export type MovieCredits = {
  id: number; // ID du film
  cast: CastMember[];
  crew: CrewMember[];
};
// Type renvoyé par Status
export type TMDBMovieStatus =
  | "Released"
  | "Rumored"
  | "Planned"
  | "In Production"
  | "Post Production"
  | "Canceled";

export type PersonCard = {
  id: number;
  name: string;
  profile_path?: string | null;
  subtitle?: string;
};
//type utilisé dans le front
export type PeopleDetails = {
  id: number;
  name: string;
  biography: string;
  profile_path: string | null;
  also_known_as: string[];
  gender: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth?: string | null;
};
//reponse brut de l'api
export type PeopleDetailsResponse = {
  id: number;
  name: string;
  biography: string;
  profile_path: string | null;
  also_known_as: string[];
  gender: number; // 0 unknown | 1 female | 2 male
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
};
// filmographie film et serie ensemble
export type CombinedCreditsResponse = {
  id: number;
  cast: CastCredit[];
  crew: CrewCredit[];
};

//pour les acteurs
export type CastCredit = {
  id: number;
  credit_id: string;
  original_title?: string; // pour les films
  original_name?: string; // pour les séries
  title?: string;
  name?: string;
  character?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  media_type: "movie" | "tv";
  vote_average: number;
  vote_count: number;
};

//pour l'équipe du fim
export type CrewCredit = {
  id: number;
  credit_id: string;
  original_title?: string;
  original_name?: string;
  title?: string;
  name?: string;
  job: string;
  department: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  media_type: "movie" | "tv";
  vote_average: number;
  vote_count: number;
};

export type MediaType = "movie" | "tv";

// utilisé par le front apres le mapping
export type FilmographyItem = {
  id: number;
  credit_id: string;
  media_type: "movie" | "tv";
  title: string;
  role?: string;
  poster_path: string | null;
  date?: string;
  director?: string;
};
