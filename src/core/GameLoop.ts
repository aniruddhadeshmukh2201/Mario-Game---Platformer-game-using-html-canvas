import Game from "./Game";

class GameLoop {
  lastTimestamp: number = 0;
  game: Game;

  constructor(game: Game) {
    this.game = game;
    console.log("GameLoop created");
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  private loop(timestamp: number) {
    if (!this.game.isPaused()) {
      const deltaTime = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;
      this.game.update();
    }

    this.game.render(); // Always render so overlays show

    requestAnimationFrame(this.loop.bind(this)); // ✅ Ensure loop continues
  }
}

export default GameLoop;
