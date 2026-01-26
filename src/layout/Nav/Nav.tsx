// Nav.tsx
import logoDmcHorizon from "@/assets/images/logo-horizon.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <Box
      sx={{
        width: { xs: "95%", sm: "90%", md: "80%" },
        maxWidth: 1280,
        mx: "auto",
        display: "flex",
        alignItems: "center",
        py: 1,
      }}
    >
      {/* Logo */}
      <Box
        component={NavLink}
        to="/"
        sx={{ display: "flex", alignItems: "center", mr: 2 }}
      >
        <Box
          component="img"
          src={logoDmcHorizon}
          alt="MovieClub"
          sx={{ height: 40, width: "auto" }}
        />
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Button
        color="inherit"
        component={NavLink}
        to="/"
        sx={{ textTransform: "none" }}
      >
        Accueil
      </Button>
      <Button
        color="inherit"
        component={NavLink}
        to="/movies"
        sx={{ textTransform: "none" }}
      >
        Films
      </Button>
    </Box>
  );
}
