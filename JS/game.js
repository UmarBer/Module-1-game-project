const ctx = canvasElement.getContext('2d');
class Game {
  constructor(CanvasElement) {
    this.canvas = CanvasElement;
    this.ctx = canvasElement.getContext('2d');
  }

  enableControls() {
    window.addEventListener('keydown', () => {
      console.log('keydown');
    });
  }
}
