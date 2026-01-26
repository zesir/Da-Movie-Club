import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/api/tmdb.movies";
import MyButton from "@/components/Button/Button";
import ResponsiveContainer from "@/components/Container/Container";
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import MediaCard from "@/components/mediaCard/mediaCard";
import { useMovies } from "@/hooks/useMovies";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

export default function MoviesPage() {
  const navigate = useNavigate();
  const {
    movies: popularMovies,
    loading: loadingPopular,
    error: errorPopular,
  } = useMovies(getPopularMovies);

  const {
    movies: topRatedMovies,
    loading: loadingTopRated,
    error: errorTopRated,
  } = useMovies(getTopRatedMovies);

  const {
    movies: upcomingMovies,
    loading: loadingUpcomingMovies,
    error: errorUpcomingMovies,
  } = useMovies(getUpcomingMovies);

  if (loadingTopRated || loadingPopular || loadingUpcomingMovies)
    return <p>Chargement...</p>;
  if (errorTopRated || errorPopular || errorUpcomingMovies)
    return (
      <p>Erreur : {errorPopular || errorTopRated || errorUpcomingMovies}</p>
    );

  return (
    <ResponsiveContainer>
      <Typography
        variant="h1"
        color="primary.main"
        sx={{ py: 6, textTransform: "uppercase" }}
      >
        Da Movie Club
      </Typography>
      <Typography
        variant="h2"
        color="primary.main"
        sx={{ py: 6, textAlign: "left" }}
      >
        En ce moment en salle
      </Typography>
      <ImageSlider content={upcomingMovies} />
      <Box>
        <Typography
          variant="h2"
          color="primary.main"
          sx={{ py: 6, textAlign: "left" }}
        >
          Les plus apprécié
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {popularMovies.slice(0, 4).map((movie) => (
          <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <MediaCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 3 }}>
        <MyButton
          variant="contained"
          onClick={() => navigate("/popular-movies")}
          sx={{ mt: 3, textAlign: "left" }}
        >
          Voir plus
        </MyButton>
      </Box>
      <Typography
        variant="h2"
        color="primary.main"
        sx={{ py: 6, textAlign: "left" }}
      >
        Les mieux noté de tout les temps !!!
      </Typography>
      <Grid container spacing={2}>
        {topRatedMovies.slice(0, 4).map((movie) => (
          <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <MediaCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 3 }}>
        <MyButton
          variant="contained"
          onClick={() => navigate("/top-rated")}
          sx={{ mt: 3, textAlign: "left" }}
        >
          Voir plus
        </MyButton>
      </Box>
    </ResponsiveContainer>
  );
}
