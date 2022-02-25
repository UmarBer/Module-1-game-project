class Bullets {
  constructor(gameInstance, x, y) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 15;
  }

  runLogic() {
    this.y -= 1;
  }

  draw() {
    this.game.ctx.save();
    this.game.ctx.fillStyle = 'yellow';
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.restore();
  }
}
