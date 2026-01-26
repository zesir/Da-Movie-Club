// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

// Définition du thème
const theme = createTheme({
  palette: {
    mode: "dark", // sombre ou light
    primary: {
      main: "#1976d2", // bleu principal
    },
    secondary: {
      main: "#dc004e", // rose secondaire
    },
    background: {
      default: "#121212", // fond global
      paper: "#1e1e1e", // fond des cards
    },
    text: {
      primary: "#ffffff",
      secondary: "#cccccc",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: { fontWeight: 700, fontSize: "3rem" },
    h2: { fontWeight: 700, fontSize: "2.5rem" },
    h3: { fontWeight: 500, fontSize: "2rem" },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
    button: { textTransform: "none" }, // pour ne pas tout mettre en majuscules
  },
  shape: {
    borderRadius: 8, // arrondi global des cards et boutons
  },
});

export default theme;
