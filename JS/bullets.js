class Bullets {
  constructor(gameInstance, x, y) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 6;
    this.height = 12.5;
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
