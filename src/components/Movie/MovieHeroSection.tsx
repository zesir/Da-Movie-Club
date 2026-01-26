import type { TMDBMovieStatus } from "@/api/tmdb.types";
import RatingCircle from "@/components/RatingCircle/RatingCircle";
import { getStatus } from "@/utils/infosProd";
import { Box, Typography } from "@mui/material";
import StatusChip from "../statusChip/StatusChip";

type MovieHeroSectionProps = {
  posterUrl?: string;
  backdropUrl?: string;
  movieTitle?: string;
  movieTagline?: string;
  voteAverage?: number;
  status?: TMDBMovieStatus;
  releaseDate?: string;
};

export default function MovieHeroSection({
  posterUrl,
  backdropUrl,
  movieTagline,
  voteAverage,
  movieTitle,
  status,
  releaseDate,
}: MovieHeroSectionProps) {
  const statusLabel = getStatus(status, releaseDate);

  return (
    <Box
      component="header"
      sx={{
        height: { xs: 300, md: 400 },
        backgroundImage: `
            linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
            url(${backdropUrl})
          `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        color: "white",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1280,
          mx: "auto",
          px: { xs: 2, md: 4 },
          display: "flex",
          gap: 3,
          alignItems: "center",
        }}
      >
        {/* Poster */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            component="img"
            src={posterUrl}
            alt={movieTitle}
            sx={{
              width: { xs: 120, md: 180 },
              borderRadius: 2,
              flexShrink: 0,
            }}
          />
          {statusLabel && <StatusChip label={statusLabel} />}
        </Box>

        {/* Infos principales */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "flex-start",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "left" }}
          >
            {movieTitle}
          </Typography>

          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", textAlign: "left" }}
          >
            {movieTagline}
          </Typography>
          <Box sx={{ mt: 1, display: "inline-flex" }}>
            {voteAverage !== undefined && <RatingCircle value={voteAverage} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
