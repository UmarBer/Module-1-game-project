class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');

    this.life = 100;
    this.player = new Player(this);
    this.zombies = [];
    this.bullets = [];
    this.enableControls();
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      const code = event.code;
      switch (code) {
        case 'ArrowLeft':
          this.player.x -= 10;
          break;
        case 'ArrowUp':
          this.player.y -= 10;
          break;
        case 'ArrowRight':
          this.player.x += 10;
          break;
        case 'ArrowDown':
          this.player.y += 10;
          break;
        case 'Space':
          this.bulletFire();
          break;
      }
    });
  }

  bulletFire() {
    const bullet = new Bullets(this, this.player.x, this.player.y);
    this.bullets.push(bullet);
  }

  createZombies() {
    const zombieSpeed = Math.random() + 0.25;
    const zombieY = Math.random() * 50;
    const zombieX = Math.random() * this.canvas.width - 50;
    const zombie = new Zombie(this, zombieX, zombieY, zombieSpeed);
    this.zombies.push(zombie);
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      this.loop();
      console.log(this.bullets.length);
    });
  }

  runLogic() {
    if (Math.random() < 0.005) {
      this.createZombies();
    }
    for (const zombie of this.zombies) {
      zombie.runLogic();
      const intersectionHappening = zombie.checkIntersection(this.player);
      const zombieOut = zombie.y >= this.canvas.height;
      if (intersectionHappening || zombieOut) {
        const zombieIndex = this.zombies.indexOf(zombie);
        this.zombies.splice(zombieIndex, 1);
        this.life -= 10;
      }
    }

    for (const bullet of this.bullets) {
      bullet.runLogic();
      for (const zombie of this.zombies) {
        const intersectionHappening = zombie.checkIntersection(bullet);
        if (intersectionHappening) {
          const zombieIndex = this.zombies.indexOf(zombie);
          this.zombies.splice(zombieIndex, 1);
          const bulletIndex = this.bullets.indexOf(bullet);
          this.bullets.splice(bulletIndex, 1);
        }
      }
      if (bullet.y - bullet.height <= 0) {
        const bulletIndex = this.bullets.indexOf(bullet);
        this.bullets.splice(bulletIndex, 1);
      }
    }
  }

  drawLife() {
    this.ctx.font = '40';
    this.ctx.fillText(`Life points remaining: ${this.life}`, 50, 750);
  }

  draw() {
    this.ctx.clearRect(0, 0, 800, 800);
    for (const zombie of this.zombies) {
      zombie.draw();
    }
    for (const bullet of this.bullets) {
      bullet.draw();
    }
    this.player.draw();
    this.drawLife();
  }
}
