// определяем канвас и контекст
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// определяем некоторые переменные
let frames = 0;
let SPEED = 2;
let index = 0;
const DEGREE = Math.PI/180;

// подгружаем картиночку
const sprite = new Image();
sprite.src = "img/sprite.png";

// добавлям звуки в массив
const SOUNDS = {
  SCORE: new Audio("audio/point.mp3"),
  FLAP: new Audio("audio/flap.mp3"),
  HIT: new Audio("audio/hit.mp3"),
  SWOOSHING: new Audio("audio/swooshing.mp3"),
  DIE: new Audio("audio/die.mp3"),
};

// состояния игры
const state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2
}

// коорбинаты кнопки старта
const startBtn = {
    x: 120,
    y: 263,
    w: 83,
    h: 29
}