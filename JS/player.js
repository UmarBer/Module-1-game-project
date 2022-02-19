class Player {
  constructor(gameInstance) {
    this.ctx = canvasElement.getContext('2d');
    this.game = gameInstance;
    this.speed = {
      x: 0,
      y: 0
    };

    const playerImg = new Image();
    playerImg.src = './Images/leon-s-kennedy.png';
    playerImg.onload = () => {
      const scale = 0.1;
      this.image = playerImg;
      this.width = playerImg.width * scale;
      this.height = playerImg.height * scale;
      this.x = canvasElement.width / 2 - this.width / 2;
      this.y = canvasElement.height - this.height - 15;
    };
  }

  draw() {
    /*ctx.save();
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();*/
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  movementEnabled() {
    if (this.image) this.draw();
    this.x += this.speed.x;
    this.y += this.speed.y;
  }
}
const player = new Player();
const keys = {
  ArrowLeft: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowDown: {
    pressed: false
  },
  space: {
    pressed: false
  }
};

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
  player.movementEnabled();

  if (keys.ArrowLeft.pressed) {
    player.speed.x = -5;
  } else if (keys.ArrowRight.pressed) {
    player.speed.x = +5;
  } else if (keys.ArrowUp.pressed) {
    player.speed.y = -5;
  } else if (keys.ArrowDown.pressed) {
    player.speed.y = +5;
  } else {
    player.speed.x = 0;
    player.speed.y = 0;
  }
}
animate();
addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      break;
    case 'ArrowUp':
      console.log('up');
      keys.ArrowUp.pressed = true;
      break;
    case 'ArrowRight':
      console.log('right');
      keys.ArrowRight.pressed = true;
      break;
    case 'ArrowDown':
      console.log('down');
      keys.ArrowDown.pressed = true;
      break;
    case ' ':
      console.log('space');
      keys.space.pressed = true;
      break;
  }
});

addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'ArrowLeft':
      player.speed.x = -5;
      keys.ArrowLeft.pressed = false;
      break;
    case 'ArrowUp':
      console.log('up');
      keys.ArrowUp.pressed = false;
      break;
    case 'ArrowRight':
      console.log('right');
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowDown':
      console.log('down');
      keys.ArrowDown.pressed = false;
      break;
    case ' ':
      console.log('space');
      keys.space.pressed = false;
      break;
  }
});
