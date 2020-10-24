"use strict";

const TICK_PER_SECOND = 17;
const BUTTON_ID = "control-button";
const CANVAS_ID = "webgl-canvas";

function setupWebGL() {
  window.removeEventListener("load", setupWebGL);

  const canvas = document.getElementById(CANVAS_ID);

  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (!gl) {
    return;
  }

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  return gl;
}

function getRenderingContext() {
  var canvas = document.querySelector("canvas");

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  var gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (!gl) {
    var paragraph = document.querySelector("p");
    paragraph.innerHTML =
      "Failed to get WebGL context." +
      "Your browser or device may not support WebGL.";
    return null;
  }

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return gl;
}

function draw() {
  console.log("tick");
}

function init() {
  const gl = getRenderingContext();

  if (!gl) {
    return;
  }

  gl.enable(gl.SCISSOR_TEST);

  gl.clearColor(1, 1, 1, 1);
  let position = [gl.drawingBufferWidth, 0];

  let timer;

  const playerSize = 20;
  function drawPlayer(x, y) {
    gl.scissor(x, y, playerSize, playerSize);
    gl.clearColor(1, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  // function startAnimation() {
  //   const button = document.getElementById(BUTTON_ID);
  //   button.removeEventListener("click", startAnimation);
  //   button.addEventListener("click", stopAnimation);
  //   button.innerHTML = "Stop";
  //   timer = setInterval(draw, TICK_PER_SECOND);
  //   draw();
  // }

  // function stopAnimation() {
  //   const button = document.getElementById(BUTTON_ID);
  //   button.removeEventListener("click", stopAnimation);
  //   button.addEventListener("click", startAnimation);
  //   button.innerHTML = "Start";
  //   clearInterval(timer);
  // }

  const size = [60, 60];

  // function draw() {
  //   gl.scissor(position[0], position[1], size[0], size[1]);
  //   gl.clear(gl.COLOR_BUFFER_BIT);
  //   position[0] -= velocity;
  // }

  // movement
  let pressedKeys = {};
  document.addEventListener("keydown", (e) => {
    pressedKeys = pressedKeys || {};

    if (e.key === "ArrowLeft") {
      pressedKeys[e.key] = true;
    }
    if (e.key === "ArrowRight") {
      pressedKeys[e.key] = true;
    }
    if (e.key === "ArrowUp") {
      pressedKeys[e.key] = true;
    }
    if (e.key === "ArrowDown") {
      pressedKeys[e.key] = true;
    }
  });
  document.addEventListener("keyup", (e) => {
    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      pressedKeys[e.key] = false;
    }
  });

  let isJumping = false;
  // jumpDuration = 200;
  // jump
  document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      isJumping = true;
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.key === " ") {
      isJumping = false;
    }
  });

  let playerPos = [
    gl.drawingBufferWidth / 2 - playerSize / 2,
    gl.drawingBufferHeight / 2 - playerSize / 2,
    // 0,
    // gl.drawingBufferHeight - 10,
  ];

  const playerVelocity = 200;
  let gravity = 3;
  let yVel = 0;
  let then = 0;
  let elapsedJumpingTime = 0;
  let onGround = true;
  let timeSpentJumping = 0;
  function draw(now) {
    // to seconds
    now *= 0.001;
    var deltaTime = now - then;
    // Remember the current time for the next frame.
    then = now;

    yVel -= gravity;

    let hAxis = 0;
    // let yAxis = 0;

    if (pressedKeys["ArrowLeft"]) {
      hAxis -= 1;
    }
    if (pressedKeys["ArrowRight"]) {
      hAxis += 1;
    }

    // if (isJumping) {
    //   playerPos[1] += 1;
    // }
    // if (pressedKeys["ArrowUp"]) {
    //   yAxis += 1;
    // }
    // if (pressedKeys["ArrowDown"]) {
    //   yAxis -= 1;
    // }

    playerPos[0] += hAxis * playerVelocity * deltaTime;
    playerPos[1] += yVel * deltaTime;

    if (playerPos[1] <= 0) {
      playerPos[1] = 0;
      onGround = true;
    } else {
      onGround = false;
    }

    if (onGround) {
      yVel = 0;
    }

    timeSpentJumping = onGround ? 0 : timeSpentJumping + deltaTime;
    if (isJumping) {
      console.log(timeSpentJumping);
      if (timeSpentJumping < 0.3) {
        yVel = 200;
      }
      // console.log("now", now);
    }

    // if (timeSpentJumping > 0.5) {
    //   yVel = 0;
    // }
    // playerPos[1] += yAxis * velocity;

    drawPlayer(playerPos[0], playerPos[1]);
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

window.addEventListener("load", init);
