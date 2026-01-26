import type { PersonCard } from "@/api/tmdb.types";
import { getProfileImage } from "@/utils/getProfileImage";
import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type PeopleSliderProps = {
  title: string;
  people: PersonCard[];
};

export default function PeopleSlider({ title, people }: PeopleSliderProps) {
  if (people.length === 0) return null;

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={16}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 2 },
          600: { slidesPerView: 4 },
          900: { slidesPerView: 6 },
        }}
      >
        {people.map((person) => {
          const profileUrl = getProfileImage(person.profile_path, person.name);

          return (
            <SwiperSlide key={`${person.id}-${person.subtitle}`}>
              <Box
                component={RouterLink}
                to={`/people/${person.id}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={profileUrl}
                    alt={person.name}
                    sx={{
                      width: 120,
                      height: 160,
                      borderRadius: 1,
                      objectFit: "cover",
                    }}
                  />

                  <Typography variant="body2" fontWeight="bold">
                    {person.name}
                  </Typography>

                  {person.subtitle && (
                    <Typography variant="caption" color="text.secondary">
                      {person.subtitle}
                    </Typography>
                  )}
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
