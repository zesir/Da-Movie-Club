import { TMDB_CONFIG } from "@/api/tmdb.config";
import { GENRES_MAP } from "@/api/tmdb.constants";
import type { Movie } from "@/api/tmdb.types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MovieIcon from "@mui/icons-material/Movie";
import ShareIcon from "@mui/icons-material/Share";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import MyButton from "../Button/Button";

type MediaCardProps = {
  movie?: Movie;
  onClick?: () => void;
};

export default function MediaCard({ movie }: MediaCardProps) {
  const navigate = useNavigate();
  if (!movie) return null;

  console.log("Movie complet :", movie);

  const genresLabel =
    movie.genre_ids && movie.genre_ids.length > 0
      ? movie.genre_ids
          .slice(0, 2)
          .map((id) => GENRES_MAP[id])
          .filter(Boolean)
          .join(", ")
      : "Genre inconnu";

  const urlPoster = movie.poster_path
    ? `${TMDB_CONFIG.IMAGE_BASE_URL}/w500${movie.poster_path}`
    : "/assets/img/default-poster.jpg";

  return (
    <Card
      onClick={() => navigate(`/movie/${movie.id}`)}
      sx={{ maxWidth: 345, cursor: "pointer" }}
    >
      <Box sx={{ position: "relative", width: "100%" }}>
        <CardMedia
          component="img" // obligatoire pour que image + alt fonctionne
          image={urlPoster}
          alt={movie.title || "Film inconnu"}
          sx={{
            aspectRatio: "2 / 3", // ratio width / height
            width: "100%",
            objectFit: "cover", // remplir sans déformer
            borderRadius: 1,
            display: "block",
          }}
        />

        <Chip
          label={genresLabel}
          size="small"
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            background: "rgba(0, 0, 0, 0.5)",
            border: "1px solid",
            borderColor: "primary.main",
          }}
        />
      </Box>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 1, // nombre de lignes max
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitLineClamp: 4, // nombre de lignes max
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton color="secondary">
          <FavoriteIcon />
        </IconButton>
        <IconButton color="primary">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <CardActions>
        <MyButton
          size="large"
          onClick={() => navigate(`/movie/${movie.id}`)}
          fullWidth
          startIcon={<MovieIcon />}
        >
          En savoir Plus
        </MyButton>
      </CardActions>
    </Card>
  );
}
