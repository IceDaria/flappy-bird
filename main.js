// создаём все нужные объекты
const gReady = new getReady()
const gOver = new gameOver();
const bg = new Background();
const fg = new Foreground();
const bird = new Bird();
const pipes = new Pipes()
const score = new Score();

// Обработчик клика на экране
canvas.addEventListener('click', (event) => {
  if (!canvas || !bird || !SOUNDS || !pipes || !score || !startBtn) {
    console.error('Одна или несколько необходимых переменных не определены.');
    return;
  }
  // Константы для определения координат клика и обработки нажатия кнопки "Start"
  const {left, top} = canvas.getBoundingClientRect();
  const clickX = event.clientX - left;
  const clickY = event.clientY - top;

  if (state.current === state.getReady) { // Если игра еще не начата, то начать
    state.current = state.game;
    SOUNDS.SWOOSHING.play();
  } else if (state.current === state.game) { // Если игра идет, то обработать клик 
      event.preventDefault();
      handleFlap();
    
  } else if (state.current === state.over && isClickOnStartBtn(clickX, clickY)) { // Если игра окончена, то обработать клик на кнопку "Start"
    resetGame();
  }
});

// Обработчик нажатия пробела для управления птицей
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    handleFlap();
  }
});

// Функция обработки нажатия на птицу
function handleFlap() {
  if (bird.y - bird.radius > 0) { // Если птица не достигла верхней границы экрана, то "поднять" птицу
    bird.flap();
    SOUNDS.FLAP.play();
  }
}

// Функция, определяющая, нажата ли кнопка "Start"
function isClickOnStartBtn(clickX, clickY) {
  const { x, y, w, h } = startBtn;
  return clickX > x && clickX < x + w && clickY > y && clickY < y + h;
}

// Функция отрисовки элементов на экране
function draw() {
    context.fillStyle = "#70c5ce";
    context.fillRect(0, 0, canvas.width, canvas.height);
   
    bg.draw();
    pipes.draw();
    fg.draw();
    bird.draw();
    gReady.draw();
    gOver.drawGameOver();
    score.draw();
}

// функция ресета игры
function resetGame() {
  pipes.reset();
  bird.speedReset();
  score.reset();
  bg.draw(); 
  state.current = state.getReady;
}

// функция апдейта
function update(){
    bird.update();
    pipes.update();
}

// функция запуска игры и обратотки анимации
function loop(){
    update();
    draw();
    frames++;
    
    requestAnimationFrame(loop);
}
loop();