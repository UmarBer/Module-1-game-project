class Player extends GameElement {
  constructor(gameInstance) {
    super(gameInstance, 350, 750, 30, 30);

    this.friction = 0.15;
  }

  runLogic() {
    const keys = this.game.keysPressed;
    for (const key of keys) {
      switch (key) {
        case 'ArrowLeft':
          this.accelerationX = -1.5;
          break;
        case 'ArrowUp':
          this.accelerationY = -1.5;
          break;
        case 'ArrowRight':
          this.accelerationX = +1.5;
          break;
        case 'ArrowDown':
          this.accelerationY = +1.5;
          break;
      }
    }
    const { x, y, speedX, speedY, accelerationX, accelerationY, friction } =
      this;
    let newAccelerationY = accelerationY * (1 - friction);
    let newAccelerationX = accelerationX * (1 - friction);
    let newSpeedX = speedX * (1 - friction * 3) + newAccelerationX;
    let newSpeedY = speedY * (1 - friction * 3) + newAccelerationY;
    let newX = x + newSpeedX;
    let newY = y + newSpeedY;
    Object.assign(this, {
      x: newX,
      y: newY,
      speedX: newSpeedX,
      speedY: newSpeedY,
      accelerationX: newAccelerationX,
      accelerationY: newAccelerationY
    });
  }

  draw() {
    this.game.ctx.save();
    this.game.ctx.fillStyle = 'blue';
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.restore();
  }
}
