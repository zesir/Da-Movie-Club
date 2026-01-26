import { TMDB_CONFIG } from "@/api/tmdb.config";
import type { PersonCard } from "@/api/tmdb.types";
import ResponsiveContainer from "@/components/Container/Container";
import MovieHeroSection from "@/components/Movie/MovieHeroSection";
import MovieInfosCard from "@/components/Movie/MovieInfosCard";
import MovieSummaryCard from "@/components/Movie/MovieSummuryCard";
import PeopleSlider from "@/components/PeopleSlider/PeopleSlider";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { useMovie } from "@/hooks/useMovie";
import { useMovieCredits } from "@/hooks/useMovieCredits";
import { getGenderTitle } from "@/utils/person";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, CardContent, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate, useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useMovie(id);
  const {
    cast,
    crew,
    loading: loadingCredits,
    error: errorCredits,
  } = useMovieCredits(id ? Number(id) : undefined);
  const navigate = useNavigate();

  if (loading || loadingCredits)
    return <CircularProgress sx={{ display: "block", m: "40px auto" }} />;
  if (error || errorCredits)
    return <Typography color="error">Erreur : {error}</Typography>;
  if (!movie) return <Typography>Aucun film trouvé.</Typography>;
  if (!crew)
    return <Typography>Aucune information sur l'équipe du film</Typography>;
  if (!cast)
    return <Typography>Aucune information sur le casting du film</Typography>;

  const backdropUrl = movie.backdrop_path
    ? `${TMDB_CONFIG.IMAGE_BASE_URL}/w780${movie.backdrop_path}`
    : "https://placehold.co/1280x720?text=No+Backdrop";

  const posterUrl = movie.poster_path
    ? `${TMDB_CONFIG.IMAGE_BASE_URL}/w500${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Poster";

  const directorMember = (crew ?? []).find(
    (member) => member.job === "Director",
  ); // CrewMember | undefined
  const directorTitle = getGenderTitle(directorMember?.gender);
  const directorName = directorMember?.name;

  const castPeople = cast.map((member) => ({
    id: member.id,
    name: member.name,
    profile_path: member.profile_path,
    subtitle: member.character,
  }));

  const MAIN_JOBS_PRIORITY: Record<string, number> = {
    Director: 1,
    "Director of Photography": 2,
    Screenplay: 3,
    Writer: 4,
    Producer: 5,
    Composer: 6,
  };

  const crewPeopleCards: PersonCard[] = crew
    .filter(
      (member) =>
        member.job &&
        MAIN_JOBS_PRIORITY[member.job] !== undefined &&
        member.profile_path,
    )
    .sort((a, b) => MAIN_JOBS_PRIORITY[a.job] - MAIN_JOBS_PRIORITY[b.job])
    .map((member) => ({
      id: member.id,
      name: member.name,
      profile_path: member.profile_path,
      subtitle: member.job, // <-- ici on met le métier
    }));

  return (
    <Box component="main">
      {/* ========================= */}
      {/* HERO / HEADER DU FILM */}
      {/* ========================= */}
      <MovieHeroSection
        posterUrl={posterUrl}
        movieTitle={movie.title}
        backdropUrl={backdropUrl}
        movieTagline={movie.tagline}
        voteAverage={movie.vote_average}
        status={movie.status}
        releaseDate={movie.release_date}
      />

      {/* ========================= */}
      {/* CONTENU PRINCIPAL */}
      {/* ========================= */}
      <ResponsiveContainer component="section">
        {/* Navigation retour */}
        <Box
          component="nav"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            mb: 2,
            width: "fit-content",
          }}
          onClick={() => navigate("/")}
        >
          <ArrowBackRoundedIcon fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            Retour à l’accueil
          </Typography>
        </Box>

        {/* Resumé des films */}

        <Grid container spacing={3}>
          {/* Carte résumé */}
          <Grid size={{ xs: 12, md: 8 }}>
            <MovieSummaryCard
              director={directorName}
              gender={directorTitle}
              movie={movie}
            />
          </Grid>

          {/* Vidéo */}
          <Grid size={{ xs: 12, md: 4 }}>
            <MovieInfosCard
              director={directorName}
              releaseDate={movie.release_date}
              budget={movie.budget}
              revenue={movie.revenue}
              belongsTo={movie.belongs_to_collection?.name}
              language={movie.original_language}
              runTime={movie.runtime}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CardContent sx={{ py: 0 }}>
              {movie && <VideoPlayer movieId={movie.id} />}
            </CardContent>
            {castPeople.length > 0 && (
              <PeopleSlider title="Casting" people={castPeople} />
            )}
            {crewPeopleCards.length > 0 && (
              <PeopleSlider
                title="Équipe principale"
                people={crewPeopleCards}
              />
            )}
          </Grid>
        </Grid>
      </ResponsiveContainer>
    </Box>
  );
}
