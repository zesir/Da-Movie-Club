import { TMDB_CONFIG } from "@/api/tmdb.config";
import type { FilmographyItem } from "@/api/tmdb.types";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";

type FilmoItemCardProps = {
  item: FilmographyItem;
};

function FilmoItemCard({ item }: FilmoItemCardProps) {
  const navigate = useNavigate();

  const posterUrl = item.poster_path
    ? `${TMDB_CONFIG.IMAGE_BASE_URL}/w185${item.poster_path}`
    : "https://placehold.co/500x750?text=No+Poster";

  const year = item.date ? new Date(item.date).getFullYear() : "—";

  return (
    <Card
      onClick={() =>
        navigate(
          item.media_type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`,
        )
      }
    >
      <Box sx={{ position: "relative", width: "100%" }}>
        <CardMedia
          component="img" // obligatoire pour que image + alt fonctionne
          image={posterUrl}
          alt={item.title || "Film inconnu"}
          sx={{
            aspectRatio: "2 / 3", // ratio width / height
            width: "100%",
            objectFit: "cover", // remplir sans déformer
            borderRadius: 1,
            display: "block",
          }}
        />
        <Chip
          label={year}
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
          variant={"body1"}
          component="div"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 1, // nombre de lignes max
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
          }}
        >
          {item.role}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default FilmoItemCard;
