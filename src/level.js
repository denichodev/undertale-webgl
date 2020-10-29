"use strict";

import { Enemy } from "./objects/enemy.js";
import { FinishPoint } from "./objects/finishPoint.js";

export const level = [
  // 3 simple low obstacle, spawn at 300
  new Enemy(
    300 + 10,
    0,
    10,
    20,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    -120
  ),
  new Enemy(
    300 + 160,
    0,
    10,
    20,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    -120
  ),
  new Enemy(
    300 + 310,
    0,
    10,
    20,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    -120
  ),

  // ladderlike obstacle, spawn at 800
  new Enemy(
    800 + 10,
    0,
    10,
    60,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    -120
  ),
  new Enemy(
    800 + 160,
    0,
    10,
    60,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    -120
  ),
  new Enemy(
    800 + 310,
    0,
    10,
    60,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    -120
  ),

  // flappybird like obstacle, spawn at 1300
  new Enemy(
    1300 + 10,
    0,
    10,
    40,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    -120
  ),
  new Enemy(
    1300 + 10,
    90,
    10,
    200,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    -120
  ),
  new Enemy(
    1300 + 160,
    0,
    10,
    60,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    -120
  ),
  new Enemy(
    1300 + 160,
    120,
    10,
    200,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    -120
  ),

  // both sides low obstacle, spawn at 1800
  new Enemy(
    1800 + 50,
    0,
    10,
    20,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    -120
  ),
  new Enemy(
    -(1800 + 50 - 280), // 280 is board width, shouldve used variable :(
    0,
    10,
    20,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    120
  ),
  new Enemy(
    1800 + 180,
    0,
    10,
    20,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    -120
  ),
  new Enemy(
    -(1800 + 180 - 280), // 280 is board width, shouldve used variable :(
    0,
    10,
    20,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    120
  ),
  new Enemy(
    1800 + 310,
    0,
    10,
    20,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    -120
  ),
  new Enemy(
    -(1800 + 310 - 280), // 280 is board width, shouldve used variable :(
    0,
    10,
    20,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    120
  ),

  // Final obstacle, spawn at different timing because of different speed
  new Enemy(
    -(2400 + 10 - 280), // 280 is board width, shouldve used variable :(
    0,
    10,
    60,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    120
  ),
  new Enemy(
    -(2400 + 80 - 280), // 280 is board width, shouldve used variable :(
    50,
    10,
    200,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    120
  ),
  new Enemy(
    -(3100 + 40 - 280), // 280 is board width, shouldve used variable :(
    0,
    10,
    20,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    150
  ),
  new Enemy(
    -(3100 + 100 - 280), // 280 is board width, shouldve used variable :(
    0,
    10,
    20,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    150
  ),
  new Enemy(
    -(3100 + 160 - 280), // 280 is board width, shouldve used variable :(
    0,
    10,
    20,
    {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
    },
    150
  ),

  new FinishPoint(
    -(3500 - 280), // 280 is board width, shouldve used variable :(
    0,
    10,
    400,
    {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    },
    150
  ),
];
