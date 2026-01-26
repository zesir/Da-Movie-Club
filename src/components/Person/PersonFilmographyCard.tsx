import type { FilmographyItem } from "@/api/tmdb.types";

import {
  Chip,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type PersonFilmographyListItemProps = {
  item: FilmographyItem;
};

export default function PersonFilmographyListItem({
  item,
}: PersonFilmographyListItemProps) {
  const year = item.date ? new Date(item.date).getFullYear() : "—";

  const link =
    item.media_type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`;

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={RouterLink}
        to={link}
        sx={{ alignItems: "flex-start" }}
      >
        <ListItemText
          primary={
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" fontWeight={600}>
                {item.title}
              </Typography>
              <Chip
                size="small"
                label={item.media_type === "movie" ? "Film" : "Série"}
              />
              <Typography variant="caption" color="text.secondary">
                {year}
              </Typography>
            </Stack>
          }
          secondary={
            item.role ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {item.role}
              </Typography>
            ) : null
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
