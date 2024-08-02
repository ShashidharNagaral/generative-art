import p5 from "p5";
import React, { useEffect, useRef } from "react";

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

let count = 50;
let objects = [];
const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(width, height);
    p.background(255);
    p.canvas.style.border = "1px solid black";
    p.noLoop();

    // Initialize objects with random positions and velocities
    for (let i = 0; i < count; i++) {
      let size = p.random(10, 30);
      let pos = randomPosition(width, height, size / 2);
      let p1 = p.createVector(pos[0], pos[1]);
      let angle = p.random(p.TWO_PI);
      let speed = p.random(1, 5);
      let v1 = p.createVector(p.cos(angle) * speed, p.sin(angle) * speed);
      objects.push({
        position: p1,
        velocity: v1,
        size: size, // Random size for ellipses
        color: randomColor(p),
      });
    }
  };

  p.draw = () => {
    p.background(255);

    for (let point of objects) {
      point.position.add(point.velocity);

      // Draw ellipse
      p.fill(point.color);
      p.noStroke();
      p.ellipse(point.position.x, point.position.y, point.size);

      // Bounce off edges with radius offset
      if (
        point.position.x + point.size / 2 > p.width ||
        point.position.x - point.size / 2 < 0
      ) {
        point.velocity.x *= -1;
      }
      if (
        point.position.y + point.size / 2 > p.height ||
        point.position.y - point.size / 2 < 0
      ) {
        point.velocity.y *= -1;
      }
    }
  };

  p.mousePressed = () => {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= width &&
      p.mouseY >= 0 &&
      p.mouseY <= height
    ) {
      if (p.isLooping()) {
        p.noLoop();
      } else {
        p.loop();
      }
    }
  };
};

const RandomMotionCircle = () => {
  useEffect(() => {
    const p = new p5(sketch, document.getElementById("random-motion-circle"));
    return () => {
      p.remove();
    };
  }, []);
  return <div id="random-motion-circle"></div>;
};

export { RandomMotionCircle };
