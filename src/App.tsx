import "./App.css";
import Demo from "./components/Demo/Demo";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import MediaCard from "./components/mediaCard/mediaCard";

function App() {
  return (
    <>
      <h1>movieClub</h1>
      <ImageSlider />
      <Demo></Demo>
      <MediaCard></MediaCard>
    </>
  );
}

export default App;
