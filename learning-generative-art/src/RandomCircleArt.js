import p5 from "p5";
import React, { useEffect } from "react";

const width = 500;
const height = 500;

const randomColor = (p) => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return p.color(r, g, b);
};

const randomPosition = (w, h, offset = 0) => {
  let max_w = w - offset;
  let max_h = h - offset;

  let min_w = offset;
  let min_h = offset;
  let x = Math.floor(Math.random() * (max_w - min_w + 1)) + min_w;
  let y = Math.floor(Math.random() * (max_h - min_h + 1)) + min_h;
  return [x, y];
};

const createCircle = (P, posx, posy, d) => {
  P.fill(randomColor(P));
  P.ellipse(posx, posy, d);
};
const sketch = (P) => {
  P.setup = () => {
    P.createCanvas(width, height);
    P.background(200);
    P.noLoop();
  };

  let count = 50;
  P.draw = () => {
    while (count--) {
      let d = P.random(20, 60);
      let pos = randomPosition(width, height, d / 2);
      P.fill(randomColor(P));
      createCircle(P, pos[0], pos[1], d);
    }
  };
};

const RandomCircleArt = () => {
  useEffect(() => {
    const p5Instance = new p5(sketch, document.getElementById("canvas"));
    return () => {
      p5Instance.remove();
    };
  }, []);
  return <div id="canvas"></div>;
};

export { RandomCircleArt };
