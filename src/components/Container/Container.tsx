// components/ResponsiveContainer.tsx
import Box from "@mui/material/Box";
import type { ElementType, ReactNode } from "react";

type ResponsiveContainerProps = {
  children: ReactNode;
  component?: ElementType;
};

export default function ResponsiveContainer({
  children,
  component = "div",
}: ResponsiveContainerProps) {
  return (
    <Box
      component={component}
      sx={{
        width: { xs: "95%", sm: "90%", md: "80%" },
        maxWidth: 1280,
        mx: "auto",
        my: 2, // marge verticale
        px: 2, // padding horizontal
      }}
    >
      {children}
    </Box>
  );
}
