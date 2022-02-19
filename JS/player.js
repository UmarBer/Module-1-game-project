class Player {
  constructor(gameInstance) {
    this.ctx = canvasElement.getContext('2d');
    this.game = gameInstance;
    this.x = 100;
    this.y = 100;
    this.width = 50;
    this.height = 50;
    this.color = 'blue';
  }
  draw() {
    this.ctx.save();
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.restore();
  }
}
const player = new Player(100, 100, 100, 'blue');
player.draw();
