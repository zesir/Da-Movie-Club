import { Box, CircularProgress, Typography } from "@mui/material";

type RatingCircleProps = {
  value: number; // note sur 10
  size?: number;
};

export default function RatingCircle({ value, size = 60 }: RatingCircleProps) {
  const percentage = Math.round(value * 10);

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={percentage}
        size={size}
        thickness={5}
        sx={{
          color:
            percentage >= 70
              ? "#21d07a"
              : percentage >= 40
                ? "#d2d531"
                : "#db2360",
          backgroundColor: "rgba(255,255,255,0.2)",
          borderRadius: "50%",
        }}
      />

      {/* Label au centre */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="subtitle2"
          component="div"
          color="white"
          fontWeight="bold"
        >
          {percentage}%
        </Typography>
      </Box>
    </Box>
  );
}
