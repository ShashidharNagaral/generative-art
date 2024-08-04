import p5 from "p5";
import React, { useEffect } from "react";

const width = 200;
const height = 200;

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
  return [Math.floor(x), Math.floor(y)];
};

let count = 2;
let objects = [];
let isCollision = false;

const isValidPosition = (p, x, y, size, objects) => {
  if (objects.length === 0) {
    return true;
  }
  for (let o of objects) {
    if (p.dist(x, y, o.position.x, o.position.y) <= (size + o.size) / 2) {
      return false;
    }
  }
  return true;
};

const placeObjectRandomlyWithoutOverlapping = (p, w, h, size, objects) => {
  let attempt = 0;
  let pos;
  do {
    pos = randomPosition(w, h, size / 2);
    attempt++;
  } while (!isValidPosition(p, pos[0], pos[1], size, objects) && attempt < 200);
  if (attempt >= 200) {
    window.alert("Not able to put object in the canvas");
    p.noLoop();
  }
  return p.createVector(pos[0], pos[1]);
};

const hasCollided = (p, objects) => {
  let obj1 = objects[0];
  let obj2 = objects[1];
  let r1 = obj1.size / 2;
  let r2 = obj2.size / 2;
  if (
    p.dist(
      obj1.position.x,
      obj1.position.y,
      obj2.position.x,
      obj2.position.y
    ) <=
    r1 + r2 + 1
  ) {
    return true;
  }
};
const sketch = (p) => {
  p.setup = () => {
    isCollision = false;
    objects = [];
    p.createCanvas(width, height);
    p.background(255);
    p.canvas.style.border = "1px solid black";
    p.noLoop();

    // Initialize objects with random positions and velocities
    for (let i = 0; i < count; i++) {
      let size = p.random(10, 30);
      let p1 = placeObjectRandomlyWithoutOverlapping(
        p,
        width,
        height,
        size,
        objects
      );
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
    // check collision
    if (hasCollided(p, objects)) {
      console.log("collision");
      isCollision = true;
      p.noLoop();
      window.alert("Balls Collided! Click to start again");
    }
  };

  p.mousePressed = () => {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= width &&
      p.mouseY >= 0 &&
      p.mouseY <= height
    ) {
      if (isCollision) {
        p.setup();
      }
      if (p.isLooping()) {
        p.noLoop();
      } else {
        p.loop();
      }
    }
  };
};

const Collision = () => {
  useEffect(() => {
    const p = new p5(sketch, document.getElementById("object-collision"));
    return () => {
      p.remove();
    };
  }, []);
  return <div id="object-collision"></div>;
};

export { Collision };
