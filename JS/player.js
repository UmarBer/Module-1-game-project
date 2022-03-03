const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

const playerImage = new Image();
playerImage.src = '/Images/spritesheet-robotic.png';

class Player extends GameElement {
  constructor(gameInstance) {
    super(gameInstance, 350, 750, 30, 30);
    this.frame = 0;
    this.gameFrame = 0;
    this.staggerFrames = 10;
    this.friction = 0.15;
    this.width = 50;
    this.height = 50;
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
    this.x = clamp(this.x, 0, this.game.canvas.width - 85);
    this.y = clamp(this.y, 0, this.game.canvas.height - 85);
  }

  draw() {
    this.game.ctx.save();
    // this.game.ctx.fillStyle = 'blue';
    // this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.drawImage(
      playerImage,
      this.frame * 320,
      0,
      320,
      320,
      this.x - 35 / 2,
      this.y - 35 / 2,
      this.width + 35,
      this.height + 35
    );

    if (this.gameFrame % this.staggerFrames === 0) {
      if (this.frame < 5) {
        this.frame++;
      } else {
        this.frame = 0;
      }
    }

    this.gameFrame++;
    this.game.ctx.restore();
  }
}
