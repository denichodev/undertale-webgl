"use strict";

const defaultState = {
  yVelocity: 0,
  playerSpeed: 220,
  gravityForce: 8,
  onGround: false,
  isJumping: false,
  timeSpentJumping: 0,
  jumpingSpeed: 180,
  pressedKeys: [],
};

export class Player {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  color = {
    r: 1,
    g: 0,
    b: 0,
    a: 1,
  };
  tag = "player";
  collideWith = ["enemy", "finishpoint"]; // this is needed for collision detection
  yVelocity = 0;
  playerSpeed = 220;
  gravityForce = 8;
  onGround = false;
  isJumping = false;
  timeSpentJumping = 0;
  jumpingSpeed = 180;
  pressedKeys = [];

  constructor(x, y, width, height, color) {
    this.resetState = () => {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      Object.assign(this, defaultState);
    };

    this.resetState();

    this.connectInput();
  }

  connectInput() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        this.isJumping = true;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp") {
        this.isJumping = false;
      }
    });
    window.addEventListener("keydown", (e) => {
      this.pressedKeys = this.pressedKeys || {};

      if (e.key === "ArrowLeft") {
        this.pressedKeys[e.key] = true;
      }
      if (e.key === "ArrowRight") {
        this.pressedKeys[e.key] = true;
      }
      if (e.key === "ArrowUp") {
        this.pressedKeys[e.key] = true;
      }
      if (e.key === "ArrowDown") {
        this.pressedKeys[e.key] = true;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown"
      ) {
        this.pressedKeys[e.key] = false;
      }
    });
  }

  checkOnGround() {
    this.onGround = this.y <= 0;
  }

  applyGravity() {
    this.yVelocity -= this.gravityForce;
  }

  checkJumping(deltaTime) {
    this.timeSpentJumping = this.onGround
      ? 0
      : this.timeSpentJumping + deltaTime;
    if (this.isJumping) {
      if (this.timeSpentJumping < 0.35) {
        this.yVelocity = this.jumpingSpeed;
      }
    }
  }

  checkHorizontalMovement(deltaTime) {
    let hAxis = 0;
    if (this.pressedKeys["ArrowLeft"]) {
      hAxis -= 1;
    }
    if (this.pressedKeys["ArrowRight"]) {
      hAxis += 1;
    }

    this.x = this.x + hAxis * this.playerSpeed * deltaTime;
  }

  checkBoundary(rect) {
    if (this.x < rect.x) {
      this.x = rect.x;
    }
    if (this.x > rect.width) {
      this.x = rect.width;
    }

    if (this.onGround) {
      this.y = 0;
    }
  }

  // game shouldnt be passed around as arg, ideally
  // we should have a better architecture for the
  // game engine, but whatever.. cant have a proper game engine
  // in 1 week.
  collide(against, game) {
    if (against.tag === "enemy") {
      // we can have an HP mechanism here, I'd rather we reset the whole game for simplicity
      game.stop();

      const messageContainer = document.getElementById("message-container");
      messageContainer.innerText = "You lost :(";

      const controlButton = document.getElementById("control-button");
      controlButton.innerText = "Reload";
      controlButton.addEventListener("click", () => {
        window.location.reload(false);
      });
    } else if (against.tag === "finishpoint") {
      game.stop();
      const messageContainer = document.getElementById("message-container");
      messageContainer.innerText = "You won!";

      const controlButton = document.getElementById("control-button");
      controlButton.innerText = "Reload";
      controlButton.addEventListener("click", () => {
        window.location.reload(false);
      });
    }
  }

  draw(gl, deltaTime) {
    this.applyGravity();

    this.checkHorizontalMovement(deltaTime);

    this.y = this.y += this.yVelocity * deltaTime;

    this.checkOnGround();

    this.checkJumping(deltaTime);

    this.checkBoundary({
      x: 0,
      y: 0,
      height: gl.drawingBufferHeight,
      width: gl.drawingBufferWidth - this.width,
    });

    gl.scissor(this.x, this.y, this.width, this.height);
    gl.clearColor(this.color.r, this.color.g, this.color.b, this.color.a);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}
