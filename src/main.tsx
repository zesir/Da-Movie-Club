import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const theme = createTheme({
  palette: {
    mode: "dark", // ou "dark"
    primary: {
      main: "#1976d2", // bleu
    },
    secondary: {
      main: "#dc004e", // rose
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* Reset CSS de Material UI */}
    <App />
  </ThemeProvider>,
);
