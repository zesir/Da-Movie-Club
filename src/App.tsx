import Header from "@/layout/Header/Header";
import MovieDetails from "@/pages/MovieDetails";
import MoviesPage from "@/pages/MoviePages";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PeopleDetailsPage from "./pages/PeopleDetailsPage";
import PopularMoviesPages from "./pages/PopularMoviesPages";
import TopRatedMoviesPages from "./pages/TopRatedMoviesPages";

export default function App() {
  return (
    <>
      {/* Header doit rester à l'intérieur du Router */}
      <Header />

      {/* Routes pour tes pages */}
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/popular-movies" element={<PopularMoviesPages />} />
        <Route path="/top-rated" element={<TopRatedMoviesPages />} />
        <Route path="/people/:id" element={<PeopleDetailsPage />} />
      </Routes>
    </>
  );
}
