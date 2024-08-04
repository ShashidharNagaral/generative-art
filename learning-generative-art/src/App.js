import { Collision } from "./Collision";
import { MultipleCollision } from "./MultipleCollision";
import { RandomCircleArt } from "./RandomCircleArt";
import { RandomMotionCircle } from "./RandomMotionCircle";

const App = () => {
  return (
    <div>
      <h1>Learning Generative Art</h1>
      <ul>
        <li>
          <h2>Random Circle Art</h2>
          <p>(Click to refresh)</p>
          <RandomCircleArt />
        </li>
        <li>
          <h2>Random Motion Circle Art</h2>
          <p>(Click to play/pause)</p>
          <RandomMotionCircle />
        </li>
        <li>
          <h2>Object Collision Detection</h2>
          <p>(Click to play/pause)</p>
          <Collision />
        </li>
        <li>
          <h2>Multiple Collision</h2>
          <p>(Click to play/pause)</p>
          <MultipleCollision />
        </li>
      </ul>
    </div>
  );
};

export default App;
