"use strict";

import { Game } from "./game.js";
import { Player } from "./objects/player.js";
import { level } from "./level.js";

const config = {
  player: {
    size: 15,
  },
};

function handleError(message) {
  const errorContainer = document.getElementById("error-selector");

  errorContainer.innerText = message;
}

function init() {
  const audioControl = document.getElementById("music");
  const canvas = document.getElementById("webgl-canvas");
  const controlButton = document.getElementById("control-button");

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const game = new Game(canvas, handleError);
  game.initViewport(0, 0, 0, 1);

  const player = new Player(
    game.gl.drawingBufferWidth / 2 - config.player.size / 2,
    game.gl.drawingBufferHeight / 2 - config.player.size / 2,
    config.player.size,
    config.player.size,
    {
      r: 1,
      g: 0,
      b: 0,
      a: 1,
    }
  );

  game.addGameObject(player);

  function start() {
    if (audioControl) {
      audioControl.play();
    }

    level.forEach((enemy) => {
      game.addGameObject(enemy);
    });

    controlButton.innerText = "Stop";
    controlButton.removeEventListener("click", start);
    controlButton.addEventListener("click", stop);
  }

  function stop() {
    if (audioControl) {
      audioControl.stop();
    }
    game.stop();

    controlButton.innerText = "Reload";
    controlButton.removeEventListener("click", stop);
    controlButton.addEventListener("click", reload);
  }

  function reload() {
    window.location.reload(false);
  }

  controlButton.addEventListener("click", start);

  requestAnimationFrame(game.draw.bind(game));
}

window.addEventListener("load", init);
