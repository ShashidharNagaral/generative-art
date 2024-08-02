import { RandomCircleArt } from "./RandomCircleArt";
import { RandomMotionCircle } from "./RandomMotionCircle";

const App = () => {
  return (
    <div>
      <h1>Learning Generative Art</h1>
      <ul>
        <li>
          <h2>Random Circle Art</h2>
          <RandomCircleArt />
        </li>
        <li>
          <h2>Random Motion Circle Art</h2>
          <RandomMotionCircle />
        </li>
      </ul>
    </div>
  );
};

export default App;
