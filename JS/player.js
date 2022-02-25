class Player {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.x = 350;
    this.y = 750;
    this.width = 30;
    this.height = 30;
  }

  draw() {
    this.game.ctx.save();
    this.game.ctx.fillStyle = 'blue';
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.restore();
  }
}
