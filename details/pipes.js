// определяем класс труб
class Pipes {
  pipesArray = [];
  top = {sX: 553, sY: 0};
  bottom = {sX: 502, sY: 0};
  w = 53;
  h = 400;
  gap = 85;
  maxYPos = -150;
  distance = this.w * 3.5; 
  isCounted = false; // добавлено свойство для подсчета очков

  draw() {
    this.pipesArray.forEach(pos => {
      const topYPos = pos.y;
      const bottomYPos = pos.y + this.h + this.gap;
      context.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, pos.x, topYPos, this.w, this.h);
      context.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, pos.x, bottomYPos, this.w, this.h);
    });
  };

update() {
  if (state.current !== state.game) return;
  if (this.pipesArray.length === 0 || canvas.width - this.pipesArray[this.pipesArray.length - 1].x >= this.distance) {
    this.pipesArray.push({
      x: canvas.width,
      y: this.maxYPos * (Math.random() + 1),
      isCounted: false
    });
  }
  this.pipesArray.forEach(pos => {
    const bottomPipeYPos = pos.y + this.h + this.gap;
    if (
      (bird.x + bird.radius > pos.x && bird.x - bird.radius < pos.x + this.w && bird.y + bird.radius > pos.y && bird.y - bird.radius < pos.y + this.h) ||
      (bird.x + bird.radius > pos.x && bird.x - bird.radius < pos.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h)
    ) {
      state.current = state.over;
      SOUNDS.HIT.play();
    }
    pos.x -= SPEED;
    const middleOfGap = pos.x + this.w / 2;
    if (middleOfGap < bird.x && !pos.isCounted) {
      if (pos.x < -this.w) {
        this.pipesArray.shift();
      }
      score.currentScore += 3;
      pos.isCounted = true;
      SOUNDS.SCORE.play();
      score.hightScore = Math.max(score.currentScore, score.hightScore);
      localStorage.setItem("hightScore", score.hightScore);

      if (score.currentScore % 3 === 0) {
        SPEED += 0.25;
      }
    }
  });
}

  reset() {
    this.pipesArray = [];
  };
}