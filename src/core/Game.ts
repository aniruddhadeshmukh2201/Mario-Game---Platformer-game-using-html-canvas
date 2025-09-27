import Renderer from "../render/Renderer";
import InputHandler from "../utils/InputHandler";
import Physics from "./Physics";
import Camera from "./Camera";
import config from "../assets/config.json";
import GameState, { GameStatus } from "./GameState";
import PhysicsBody from "../physics/PhysicsBody";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  private defaultCanvasHeight: number = 400;

  private inputHandler: InputHandler;
  private renderer: Renderer;
  private physics: Physics;
  // Todo : maybe we can move this to the renderer
  private camera: Camera;
  private gameState: GameState;

  constructor() {
    this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    // If config.canvasHeight exists, use it
    if ((config as any).canvasHeight) {
      this.defaultCanvasHeight = (config as any).canvasHeight;
    }
    this.resizeCanvas();
    window.addEventListener("resize", this.resizeCanvas.bind(this));
    this.gameState = new GameState(config);
    this.ctx = this.canvas.getContext("2d")!;
    this.inputHandler = new InputHandler();
    this.renderer = new Renderer(this.canvas, this.handleNextLevel.bind(this));
    this.physics = new Physics();
    this.camera = new Camera(0, 0, this.canvas.width, this.canvas.height);
    console.log("Game created", this.canvas.width, this.canvas.height);
  }

  private resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = this.defaultCanvasHeight;
    if (this.camera) {
      this.camera = new Camera(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  public update() {
    this.handleInput();
    this.physics.applyPhysics(
      [this.gameState.getPlayer(), ...this.gameState.getObjects()].filter(
        (obj) => "applyGravity" in obj
      ) as PhysicsBody[]
    );
    this.camera.update(this.gameState.getPlayer(), this.canvas.width);

    // Check if player fell below the ground (out of screen)
    const player = this.gameState.getPlayer();
    if (player.getY() - player.getHeight() / 2 > this.canvas.height) {
      this.gameState.setStatus(GameStatus.LOST);
    }
  }

  private handleInput() {
    if (
      (this.inputHandler.isKeyPressed("ArrowUp") ||
        this.inputHandler.isKeyPressed("space")) &&
      this.gameState.getPlayer().getOnGround()
    ) {
      this.gameState.getPlayer().jump();
    }
    if (this.inputHandler.isKeyPressed("ArrowLeft")) {
      this.gameState.getPlayer().moveLeft(-0.1);
    }
    if (this.inputHandler.isKeyPressed("ArrowRight")) {
      this.gameState.getPlayer().moveRight(0.1);
    }
    // Reset keys if needed
    this.inputHandler.resetKeys();
  }

  isPaused() {
    return this.gameState.isPaused();
  }

  render() {
    this.renderer.clearCanvas();

    // Draw objects relative to the camera’s position
    const visibleObjects = [
      this.gameState.getPlayer(),
      ...this.gameState.getObjects(),
    ]
      .filter((obj) => {
        let objStartX = obj.getX() - obj.getWidth() / 2;
        let objEndX = obj.getX() + obj.getWidth() / 2;
        // TODO :  maybe we need to think of a better way to check if the object is visible
        if (
          objEndX > this.camera.getX() &&
          objStartX < this.camera.getX() + this.canvas.width
        ) {
          return true;
        } else {
          return false;
        }
      })
      .map((obj) => {
        return {
          gameObject: obj,
          renderX: obj.getX() - this.camera.getX(),
          renderY: obj.getY() - this.camera.getY(),
        };
      });
    this.renderer.drawGameObjects(visibleObjects);

    if (this.gameState.getStatus() === GameStatus.LOST) {
      this.renderer.renderLostOverlay();
      return;
    }
    if (this.gameState.getStatus() === GameStatus.WON) {
      this.renderer.renderWinOverlay();
      return;
    }
    if (this.gameState.getStatus() === GameStatus.COMPLETE) {
      this.showGameCompletedScreen();
      return;
    }
  }

  private restartGame() {
    console.log("🔄 Restarting Game...");
    this.gameState = new GameState(config); // ✅ Reset to first level
    this.camera = new Camera(0, 0, this.canvas.width, this.canvas.height);
  }

  private handleNextLevel() {
    if (this.gameState.getStatus() === GameStatus.COMPLETE) {
      console.log("🎉 Game Completed!");
      this.showGameCompletedScreen();
      return; // ✅ Stop advancing levels
    }

    console.log("🚀 Advancing to next level...");
    this.renderer.clearCanvas();
    this.gameState.advanceLevel();
    // Reset camera to new level
    this.camera = new Camera(0, 0, this.canvas.width, this.canvas.height);

    // Ensure physics and objects are refreshed
    this.physics = new Physics();

    // Ensure game re-renders properly
    this.render();
  }

  private showGameCompletedScreen() {
    this.renderer.clearCanvas();

    // Show "Game Completed!" text
    this.ctx.fillStyle = "white";
    this.ctx.font = "40px Arial";
    this.ctx.fillText(
      "🎉 Game Completed! 🎉",
      this.canvas.width / 2 - 150,
      this.canvas.height / 2 - 50
    );

    // Remove any existing restart button
    const existingButton = document.getElementById("restartButton");
    if (existingButton) {
      existingButton.remove();
    }

    // Create a Restart button
    const restartButton = document.createElement("button");
    restartButton.id = "restartButton"; // Add an ID to track it
    restartButton.textContent = "Restart Game";
    restartButton.style.position = "absolute";
    restartButton.style.top = "60%";
    restartButton.style.left = "50%";
    restartButton.style.transform = "translate(-50%, -50%)";
    restartButton.style.padding = "10px 20px";
    restartButton.style.fontSize = "18px";
    restartButton.style.cursor = "pointer";

    restartButton.onclick = () => {
      console.log("🔄 Restarting Game...");
      this.restartGame();

      // Ensure the button is removed after restarting
      restartButton.remove();
    };

    document.body.appendChild(restartButton);
  }
}

export default Game;
