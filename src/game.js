"use strict";

export class Game {
  gl = null;
  gameObjects = [];
  then = 0;

  constructor(canvas, onError) {
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
      onError("Failed to get WebGL context.");
    } else {
      this.gl = gl;
    }
  }

  addGameObject(gameObject) {
    this.gameObjects = this.gameObjects.concat(gameObject);
  }

  initViewport(r, g, b, a) {
    if (this.gl) {
      this.gl.enable(this.gl.SCISSOR_TEST);
      this.gl.viewport(
        0,
        0,
        this.gl.drawingBufferWidth,
        this.gl.drawingBufferHeight
      );
      this.gl.clearColor(r, g, b, a);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
  }

  stop() {
    // for (let i = 0; i < this.gameObjects.length; i++) {
    //   this.gameObjects[i].resetState();
    // }
    this.gameObjects = [];
  }

  checkCollision(gObj) {
    if (gObj.collideWith) {
      for (let j = 0; j < this.gameObjects.length; j++) {
        const against = this.gameObjects[j];
        // for every `against` object, if the gObj collides with the `against` tag
        if (gObj.collideWith.includes(against.tag)) {
          // check the actual rect
          if (
            gObj.x < against.x + against.width &&
            gObj.x + gObj.width > against.x &&
            gObj.y < against.y + against.height &&
            gObj.y + gObj.height > against.y
          ) {
            gObj.collide(against, this);
          }
        }
      }
    }
  }

  draw(now) {
    // to seconds
    now *= 0.001;

    const deltaTime = now - this.then;
    // Remember the current time for the next frame.
    this.then = now;

    for (let i = 0; i < this.gameObjects.length; i++) {
      this.gameObjects[i].draw(this.gl, deltaTime);

      this.checkCollision(this.gameObjects[i]);
    }
    requestAnimationFrame(this.draw.bind(this));
  }
}
