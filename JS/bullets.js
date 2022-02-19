class Bullet {
  constructor(x, y, speed) {
    //this.game = gameInstance;
    this.ctx = canvasElement.getContext('2d');
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 5;
    this.speed = speed;
  }
  draw() {
    this.ctx.save();
    this.ctx.filStyle = 'black';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.restore();
  }
}
addEventListener('click', (event) => {
  const bullet = new Bullet(event.clientX, event.clientY, null);
  bullet.draw();
});
