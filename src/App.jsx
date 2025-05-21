import "./App.css";
import "./index.css";
import DrumMachine from "./components/DrumMachine";
import { Helmet } from "react-helmet-async";
function App() {
  return (
    <>
      <Helmet>
        <title>
          Online Drum Machine – Play Drum Pads & Make Beats Instantly
        </title>
        <meta
          name="description"
          content="Interactive online drum machine with responsive drum pads, sound banks, and volume control. Create beats and play sounds directly from your keyboard or touchscreen."
        />
        <meta
          name="keywords"
          content="drum machine, online drum machine, drum pads, virtual drum kit, beat maker, play drums online, responsive drum machine, drum sampler, soundboard"
        />
        <meta name="author" content="Juan Sebastián Suárez" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <DrumMachine />
    </>
  );
}

export default App;
