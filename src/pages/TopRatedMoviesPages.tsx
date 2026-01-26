import { getTopRatedMovies } from "@/api/tmdb.movies";
import ResponsiveContainer from "@/components/Container/Container";
import MediaCard from "@/components/mediaCard/mediaCard";
import { useMovies } from "@/hooks/useMovies";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const PopularMoviesPages = () => {
  const {
    movies: popularMovies,
    loading: loadingPopular,
    error: errorPopular,
  } = useMovies(getTopRatedMovies);

  if (loadingPopular) return <p>Chargement...</p>;
  if (errorPopular) return <p>Erreur : {errorPopular}</p>;

  return (
    <>
      <ResponsiveContainer>
        <Typography variant="h1" color="primary" sx={{ py: 6 }}>
          Les mieux noté de tout les temps !!!!
        </Typography>
        <Grid container spacing={2}>
          {popularMovies.map((movie) => (
            <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <MediaCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </ResponsiveContainer>
      ;
    </>
  );
};

export default PopularMoviesPages;
