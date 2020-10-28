"use strict";

export class Enemy {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  tag = "enemy";
  color = {
    r: 1,
    g: 0,
    b: 0,
    a: 1,
  };
  xVelocity = 0;

  constructor(x, y, width, height, color, xVelocity) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.xVelocity = xVelocity;

    this.resetState = () => {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.xVelocity = xVelocity;
    };

    this.resetState();
  }

  draw(gl, deltaTime) {
    this.x = this.x += this.xVelocity * deltaTime;

    gl.scissor(this.x, this.y, this.width, this.height);
    gl.clearColor(this.color.r, this.color.g, this.color.b, this.color.a);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}
