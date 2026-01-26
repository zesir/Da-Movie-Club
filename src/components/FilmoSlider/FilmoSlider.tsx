import { getMediaDate } from "@/api/tmdb.movies";
import type { FilmographyItem } from "@/api/tmdb.types";
import { Box, Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";

import { A11y, Navigation, Pagination } from "swiper/modules";
import FilmoItemCard from "./FilmoItemCard";

type FilmoSliderProps = {
  title: string;
  items: FilmographyItem[];
};

const FilmoSlider = ({ title, items }: FilmoSliderProps) => {
  const sortedItems = [...items].sort(
    (a, b) => getMediaDate(b) - getMediaDate(a),
  );

  const uniqueItems = Array.from(
    new Map(
      sortedItems.map((item) => [`${item.media_type}-${item.id}`, item]),
    ).values(),
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={16}
        navigation
        breakpoints={{
          0: { slidesPerView: 2 },
          600: { slidesPerView: 3 },
          900: { slidesPerView: 3 },
        }}
      >
        {uniqueItems.map((item) => (
          <SwiperSlide key={`${item.media_type}-${item.id}`}>
            <FilmoItemCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
export default FilmoSlider;
