import * as THREE from "three";
type Movement = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  forward: boolean;
  backward: boolean;
};

export type Controls = {
  movement: Movement;
  init(): void;
};

type Mouse = {
  position: THREE.Vector2;
  click: boolean;
};

// Description: This file contains the KeyControls class which is used to handle keyboard controls for the game.

export class PlaneControls {
  keys: Movement = {
    up: false,
    down: false,
    left: false,
    right: false,
    forward: false,
    backward: false,
  };
  mouse: Mouse = { position: new THREE.Vector2(), click: false };

  constructor() {
    this.init();
    console.log("KeyControls initialized");
  }

  init(): void {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      switch (event.key) {
        case "w":
        case "ArrowUp":
          this.keys.up = true;
          break;
        case "s":
        case "ArrowDown":
          this.keys.down = true;
          break;
        case "a":
        case "ArrowLeft":
          this.keys.left = true;
          break;
        case "d":
        case "ArrowRight":
          this.keys.right = true;
          break;
      }
    });

    window.addEventListener("keyup", (event: KeyboardEvent) => {
      switch (event.key) {
        case "w":
        case "ArrowUp":
          this.keys.up = false;
          break;
        case "s":
        case "ArrowDown":
          this.keys.down = false;
          break;
        case "a":
        case "ArrowLeft":
          this.keys.left = false;
          break;
        case "d":
        case "ArrowRight":
          this.keys.right = false;
          break;
      }
    });

    window.addEventListener("mousemove", (event) => {
      this.mouse.position.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.position.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener("click", (event) => {
      this.mouse.click = true;
    });

    window.addEventListener("mouseup", (event) => {
      this.mouse.click = false;
    });
  }
}
