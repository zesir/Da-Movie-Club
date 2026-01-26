import type { Movie } from "@/api/tmdb.types";
import { Box, Card, CardMedia, Chip, Typography } from "@mui/material";

type MovieSummaryCardProps = {
  movie: Movie;
  className?: string; // pour permettre un style externe si nécessaire
  sx?: object; // pour MUI sx
  director?: string;
  gender?: string;
};

export default function MovieSummaryCard({
  movie,
  className,
  sx,
  director,
  gender,
}: MovieSummaryCardProps) {
  //badge lien genre du film
  const genreChips = movie.genres?.slice(0, 3).map((g) => (
    <Chip
      key={g.id} // clé unique
      label={g.name} // le texte du chip
      size="small" // optionnel
      sx={{ mr: 0.5, mb: 0.5 }} // petite marge si plusieurs
    />
  ));

  //posterUrl
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/assets/img/default-poster.jpg";

  return (
    <Card
      className={className}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // image à gauche sur desktop
        gap: 2,
        padding: 2,
        borderRadius: 2,
        ...sx,
      }}
    >
      {/* Image poster */}
      <CardMedia
        component="img"
        image={posterUrl}
        alt={movie.title}
        sx={{
          width: { xs: "100%", md: 180 },
          borderRadius: 1,
          objectFit: "cover",
          flexShrink: 0,
        }}
      />

      {/* Contenu texte */}
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "left" }}>
          {movie.title}
        </Typography>
        {director && (
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", mt: 1, textAlign: "left" }}
          >
            Réalisé par : {gender} {director}
          </Typography>
        )}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "left", fontWeight: "bold" }}
        >
          {movie.tagline}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "left",
          }}
        >
          {movie.overview}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
          {genreChips}
        </Box>
      </Box>
    </Card>
  );
}
