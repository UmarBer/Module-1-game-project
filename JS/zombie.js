const zombieImage = new Image();
zombieImage.src = '/Images/Zombie/spritesheet.png';

class Zombie {
  constructor(gameInstance, x, y, speed) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 30;
    this.height = 50;
    this.frame = 0;
    this.gameFrame = 0;
    this.staggerFrames = 5;
  }

  checkIntersection(element) {
    return (
      element.x + element.width > this.x &&
      element.x < this.x + this.width &&
      element.y + element.height > this.y &&
      element.y < this.y + this.height
    );
  }

  runLogic() {
    this.y += this.speed;
  }

  draw() {
    //this.frame++
    this.game.ctx.save();
    // this.game.ctx.fillStyle = 'red';
    //this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.drawImage(
      zombieImage,
      this.frame * 180,
      0,
      187,
      378,
      this.x,
      this.y,
      this.width,
      this.height
    );

    if (this.gameFrame % this.staggerFrames == 0) {
      if (this.frame < 5) this.frame++;
      else this.frame = 0;
    }

    this.gameFrame++;
    this.game.ctx.restore();
  }
}
