import Game from "./Game";

class GameLoop {
  lastTimestamp: number = 0;
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  private loop(timestamp: number) {
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    this.game.update();
    this.game.render();
  }
}

export default GameLoop;
