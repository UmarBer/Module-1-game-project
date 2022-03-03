class Level2 {
  constructor(gameInstance) {
    this.game = gameInstance;
  }

  createZombies2() {
    let zombieSpeed = Math.random() + 10.7;
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

  Logic() {
    console.log('Level2');
    this.player.runLogic();
    if (Math.random() < 0.7) {
      this.createZombies2();
      console.log('Level2Zombies');
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
  }
}
