class Game {
  constructor(canvasElement, screens) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.screens = screens;
    this.running = false;
    this.enableControls();

    //this.keysPressed = [];
    //this.enableControls();
  }

  start() {
    this.running = true;
    this.life = 100;
    this.kills = 0;
    this.player = new Player(this);
    this.zombies = [];
    this.bullets = [];
    this.keysPressed = [];
    this.music();
    this.displayScreen('playing');

    this.loop();
  }

  music() {
    const backgroundMusic = new Audio(
      '/Music/Storm(loop) - dark - heavy - lurking.wav'
    );
    backgroundMusic.play();
  }

  displayScreen(name) {
    for (let screenName in this.screens) {
      this.screens[screenName].style.display = 'none';
    }
    this.screens[name].style.display = '';
  }

  lose() {
    this.running = false;
    this.displayScreen('end');
  }

  enableControls() {
    const keysToPreventDefaultAction = [
      'ArrowUp',
      'ArrowDown',
      'ArrowRight',
      'ArrowLeft'
    ];
    window.addEventListener('keydown', (event) => {
      if (keysToPreventDefaultAction.includes(event.code)) {
        event.preventDefault();
      }
      this.keysPressed.push(event.code);
    });
    window.addEventListener('keyup', (event) => {
      this.keysPressed = this.keysPressed.filter((code) => code !== event.code);
    });
    window.addEventListener('keydown', (event) => {
      const code = event.code;
      switch (code) {
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
    const zombieSpeed = Math.random() + 0.3;
    let zombieY = Math.random() * 50;
    let zombieX = Math.random() * this.canvas.width - 50;
    const zombie = new Zombie(this, zombieX, zombieY, zombieSpeed);
    if (zombieX + 30 >= this.canvas.width - 1) zombieX -= 30;
    else if (zombieX <= 5) zombieX += 30;
    if (this.zombies.length <= 9) {
      this.zombies.push(zombie);
    }
    console.log(this.zombies.length);
  }
  createZombies2() {
    const zombieSpeed = Math.random() + 2.7;
    let zombieY = Math.random() * 50;
    let zombieX = Math.random() * this.canvas.width - 50;
    const zombie = new Zombie(this, zombieX, zombieY, zombieSpeed);
    if (zombieX + 30 >= this.canvas.width - 1) zombieX -= 30;
    else if (zombieX <= 5) zombieX += 30;
    if (this.zombies.length <= 19) {
      this.zombies.push(zombie);
    }
    console.log(this.zombies.length);
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      if (this.running) {
        this.loop();
      }
    });
  }

  runLogic() {
    this.player.runLogic();
    if (Math.random() < 0.0035) {
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
        if (intersectionHappening) this.kills += 1;
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
    if (this.life <= 0) this.lose();
    if (this.kills >= 10) this.level2();
  }

  level2() {
    this.kills = 0;
    this.createZombies2();
  }

  drawLife() {
    this.ctx.fillStyle = 'red';
    this.ctx.font = 'bold 20px serif';
    this.ctx.fillText(`Life points remaining: ${this.life}`, 50, 50);
  }

  drawKills() {
    this.ctx.fillStyle = 'purple';
    this.ctx.font = 'bold 20px serif';
    this.ctx.fillText(`Kills: ${this.kills}`, 700, 50);
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
    this.drawKills();
  }
}
