// ImageSlider.tsx
import { TMDB_CONFIG } from "@/api/tmdb.config";
import type { Movie, TMDBMovieStatus } from "@/api/tmdb.types";
import { getStatus } from "@/utils/infosProd";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import StatusChip from "../statusChip/StatusChip";

type SliderProps = {
  content: Movie[];
};

const ImageSlider = ({ content }: SliderProps) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Swiper
        style={{ height: 500 }}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {content.slice(0, 8).map((movie) => {
          const backdropUrl = movie.backdrop_path
            ? `${TMDB_CONFIG.IMAGE_BASE_URL}/w780${movie.backdrop_path}`
            : "/assets/img/default-backdrop.jpg";

          const posterUrl = movie.poster_path
            ? `${TMDB_CONFIG.IMAGE_BASE_URL}/w500${movie.poster_path}`
            : "/assets/img/default-poster.jpg";

          // Calcul du label de status
          const statusLabel = movie.status
            ? getStatus(movie.status as TMDBMovieStatus, movie.release_date)
            : movie.release_date
              ? `Sortie le ${new Date(movie.release_date).toLocaleDateString("fr-FR")}`
              : undefined;

          return (
            <SwiperSlide key={movie.id}>
              <Box
                onClick={() => navigate(`/movie/${movie.id}`)}
                sx={{
                  height: 500,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  backgroundImage: `url(${backdropUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  px: 4,
                  py: 2,
                  gap: 2,
                }}
              >
                {/* Poster */}
                <Box
                  component="img"
                  src={posterUrl}
                  alt={movie.title}
                  sx={{
                    width: 200,
                    borderRadius: 1,
                    boxShadow: 3,
                  }}
                />

                {/* Titre */}
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "1px 1px 6px rgba(0,0,0,0.8)",
                  }}
                >
                  {movie.title}
                </Typography>

                {/* Status */}
                {statusLabel && <StatusChip label={statusLabel} />}

                {/* Date de sortie */}
                {movie.release_date && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "white",
                      textShadow: "1px 1px 6px rgba(0,0,0,0.8)",
                    }}
                  >
                    Sortie :{" "}
                    <strong>
                      {new Date(movie.release_date).toLocaleDateString("fr-FR")}
                    </strong>
                  </Typography>
                )}
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default ImageSlider;
