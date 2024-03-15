// Description: This file contains the KeyControls class which is used to handle keyboard controls for the game.
export class KeyControls {
  keys = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  constructor() {
    this.init();
    console.log("KeyControls initialized");
  }

  init() {
    // Keyboard controls

    window.addEventListener("keydown", (event) => {
      console.log(event);
      switch (event.key) {
        case "ArrowUp":
        case "w":
          this.keys.up = true;
          break;
        case "ArrowDown":
        case "s":
          this.keys.down = true;
          break;
        case "ArrowLeft":
        case "a":
          this.keys.left = true;
          break;
        case "ArrowRight":
        case "d":
          this.keys.right = true;
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
          this.keys.up = false;
          break;
        case "ArrowDown":
        case "s":
          this.keys.down = false;
          break;
        case "ArrowLeft":
        case "a":
          this.keys.left = false;
          break;
        case "ArrowRight":
        case "d":
          this.keys.right = false;
          break;
      }
    });
  }
}
