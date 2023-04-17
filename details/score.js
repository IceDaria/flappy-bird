class Score {
    constructor() {
      this.hightScore = parseInt(localStorage.getItem("hightScore")) || 0;
      this.currentScore = 0;
    }

    draw() {
        if (state.current == state.game) {
            context.lineWidth = 2;
            context.font = "30px 'Press Start 2P', cursive";
            context.strokeStyle = "#e10b25";
            context.strokeText(this.currentScore, 150, 50);
        } else if (state.current == state.over) {
           context.font = "20px 'Press Start 2P', cursive";
           context.strokeText(this.currentScore, 225, 188);
        
           context.strokeText(this.hightScore, 220, 230);
        }
    }

    reset() {
        this.currentScore = 0;
    }
}