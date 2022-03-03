const canvasElement = document.querySelector('canvas');

const startScreenElement = document.getElementById('start-screen');
const playingScreenElement = document.getElementById('playing-screen');
const endScreenElement = document.getElementById('game-over-screen');

const screenElements = {
  start: startScreenElement,
  playing: playingScreenElement,
  end: endScreenElement
};

const game = new Game(canvasElement, screenElements);

const startButton = startScreenElement.querySelector('button');
startButton.addEventListener('click', () => {
  game.start();
});

const endButton = endScreenElement.querySelector('button');
endButton.addEventListener('click', () => {
  game.start();
});

const backgroundMusic = new Audio(
  '/Music/Storm(loop) - dark - heavy - lurking.wav'
);
const gameOverMusic = new Audio('/Music/dead-screen.wav');
const zombieSound = new Audio('/Music/zombie-dead.wav');
const gunshotSound = new Audio('/Music/gunshot.wav');
