import { getMovieVideos } from "@/api/tmdb.movies";
import type { MovieVideo } from "@/api/tmdb.types";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type VideoPlayerProps = {
  movieId: number;
};

const VideoPlayer = ({ movieId }: VideoPlayerProps) => {
  const [videos, setVideos] = useState<MovieVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getMovieVideos(movieId);
        setVideos(data.results);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [movieId]);

  if (loading) return <Typography>Chargement…</Typography>;

  const trailer =
    videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
    videos.find((v) => v.site === "YouTube");

  if (!trailer) {
    return <Typography>Aucune vidéo disponible.</Typography>;
  }

  const embedUrl = `https://www.youtube.com/embed/${trailer.key}`;

  return (
    <Box>
      <Box
        sx={{
          aspectRatio: "16 / 9",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <iframe
          src={embedUrl}
          title="YouTube trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default VideoPlayer;
