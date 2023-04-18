class Bird {
  constructor () {}
// определяем массив спрайтов для анимации
  animation = [
    { sX: 276, sY: 112 },
    { sX: 276, sY: 139 },
    { sX: 276, sY: 164 }
  ];
  size = [34, 26]
  x = 50;
  y = 150;
  radius = 12;
  
  // константы для осуществения анимации
  frame = 0;
  direction = 1;
  
  // константы для физики птицы
  gravity = 0.25;
  speed = 3;
  jump = 0;

  // константы для вращения птицы
  rotation = 0;
  period = 0;

// рисуем птичку на канвасе
  draw () {
    const bird = this.animation[this.frame];

    context.save();
    
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.drawImage(sprite,
      bird.sX, bird.sY, this.size[0], this.size[1],
      -this.size[0] / 2, -this.size[1] / 2, this.size[0], this.size[1]
    );

    context.restore();
  };

// задаём силу прыжка
  flap() {
    this.jump = -this.speed;
  };

// определяем логику падения птички
  fall() {
  this.jump += this.gravity;
  this.y += this.jump;

  // определяем правила столкновения с землёй
  if (this.y + this.size[1] / 2 >= canvas.height - fg.fg.sH) {
    this.y = canvas.height - fg.fg.sH - this.size[1] / 2;
    if (state.current === state.game) {
      state.current = state.over;
      SOUNDS.DIE.play();
    }
  }
}


  update() {
  // птичка хлопает крылышками медленнее, если игра не начата
  this.period = state.current == state.getReady ? 10 : 5;
  // циклично анимируем птицу, выбирая frame из массива анимации, 
  // выбираем направление движения цикла
  this.frame += this.direction * (frames % this.period == 0 ? 1 : 0);
  if (this.frame >= this.animation.length - 1 && this.direction == 1) {
    this.direction = -1;
  } else if (this.frame <= 0 && this.direction == -1) {
    this.direction = 1;
  }
// определем логику поворота птички в зависимости от её состояния, выбираем кадр для отрисовки
  if (state.current == state.getReady) {
    this.y = 150; 
    this.rotation = 0 * DEGREE;
  } else {
    this.fall(); // используем метод "fall" для обновления позиции птицы
    if (this.jump >= this.speed) {
      this.rotation = 90 * DEGREE;
      this.frame = 1;
    } else {
      this.rotation = -25 * DEGREE;
    }
  }
}
// обнуляем 
  speedReset() {
    this.jump = 0;
  };
}
