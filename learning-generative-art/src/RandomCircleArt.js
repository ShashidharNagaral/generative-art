import p5 from "p5";
import React, { useEffect, useRef } from "react";

const width = 1000;
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

const sketch = (p) => {
  p.setup = () => {
    id = p.createCanvas(width, height);
    p.background(200);
    p.noLoop();
  };

  let count = 100;
  p.draw = () => {
    p.background(200);
    for (let i = 0; i < count; i++) {
      let d = p.random(10, 60);
      let pos = randomPosition(width, height, d / 2);
      p.fill(randomColor(p));
      p.ellipse(pos[0], pos[1], d);
    }
  };

  p.keyPressed = () => {
    if (p.keyCode === p.ENTER) {
      p.redraw();
    }
  };

  p.mousePressed = () => {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= width &&
      p.mouseY >= 0 &&
      p.mouseY <= height
    ) {
      p.redraw();
    }
  };
};

const RandomCircleArt = () => {
  useEffect(() => {
    const p = new p5(sketch, document.getElementById("random-circle-art"));
    return () => {
      p.remove();
    };
  }, []);
  return <div id="random-circle-art"></div>;
};

export { RandomCircleArt };
