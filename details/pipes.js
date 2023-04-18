// определяем класс труб
class Pipes {
  pipesArray = [];
  top = {sX: 553, sY: 0}; // источник
  bottom = {sX: 502, sY: 0};
  w = 53;
  h = 400;
  gap = 85; // расстояние между верхней и нижней
  maxYPos = -150;
  distance = this.w * 3.5; // расстояние, с которым трубы отрисовываются
  isCounted = false; // добавлено свойство для подсчета очков

  draw() {
    this.pipesArray.forEach(pos => {
      const topYPos = pos.y;
      const bottomYPos = pos.y + this.h + this.gap;
      // отрисовываем верхнюю трубу
      context.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, pos.x, topYPos, this.w, this.h);
      // нижнюю
      context.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, pos.x, bottomYPos, this.w, this.h);
    });
  };

// добавляем проверку на столкновение птицы с трубами, 
// при столкновении заканчиваем игру, проигрываем звук
checkCollision() {
    this.pipesArray.forEach(pos => {
      const bottomPipeYPos = pos.y + this.h + this.gap;
      if (
        (bird.x + bird.radius > pos.x && bird.x - bird.radius < pos.x + this.w && bird.y + bird.radius > pos.y && bird.y - bird.radius < pos.y + this.h) ||
        (bird.x + bird.radius > pos.x && bird.x - bird.radius < pos.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h)
      ) {
        state.current = state.over;
        SOUNDS.HIT.play();
      }
    });
  }

// проверяем прошла ли птицы середину трубы, если да, то счёт увеличивается на 1
  checkPassed() {
    const middleOfGap = pipe.x + this.w / 2;
    if (middleOfGap < bird.x && !pipe.isCounted) {
      if (pipe.x < -this.w) {
        this.pipesArray.shift();
      }

      score.currentScore += 1;
      pipe.isCounted = true;
      SOUNDS.SCORE.play();
      // помещаем значение рекорда в локальное хранилище, записываем его
      score.highScore = Math.max(score.currentScore, score.highScore);
      localStorage.setItem("highScore", score.highScore);

      // увеличиваем немного скорость каждые 10 очков
      if (score.currentScore % 10 === 0) {
        SPEED += 0.25;
      }
    }
  }

// прописываем логику появления новых труб
  update() {
    if (state.current !== state.game) return;
    if (this.pipesArray.length === 0 || canvas.width - this.pipesArray[this.pipesArray.length - 1].x >= this.distance) {
      this.pipesArray.push({
        x: canvas.width,
        y: this.maxYPos * (Math.random() + 1),
        isCounted: false
      });
    }
    this.checkCollision(bird);
    this.pipesArray.forEach(pos => {
      const bottomPipeYPos = pos.y + this.h + this.gap;
      pos.x -= SPEED;
      this.checkPassed(pos);
    });
  }

// обнуляем массив 
  reset() {
    this.pipesArray = [];
  };
}
