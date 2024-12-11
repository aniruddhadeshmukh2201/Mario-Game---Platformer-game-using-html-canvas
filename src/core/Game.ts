import Renderer from "../render/Renderer";
import InputHandler from "../utils/InputHandler";
import Physics from "./Physics";
import Camera from "./Camera";
import config from '../assets/config.json';
import GameState from "./GameState";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  private inputHandler: InputHandler;
  private renderer: Renderer;
  private physics: Physics;
  private camera: Camera;
  private gameState: GameState; 
  
  constructor() {
    this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    this.canvas.width = this.canvas.clientWidth;  
    this.canvas.height = this.canvas.clientHeight;
    this.gameState = new GameState(config);
    this.ctx = this.canvas.getContext("2d")!;
    this.inputHandler = new InputHandler();
    this.renderer = new Renderer(this.canvas);
    this.physics = new Physics();
    this.camera = new Camera(0, 0, 800, 400);
    console.log("Game created");
  }

  public update() {
    this.handleInput();
    this.physics.applyPhysics([this.gameState.getPlayer(), ...this.gameState.getGameWorld().getObjects()], this.canvas.height, this.camera);
    this.camera.update(this.gameState.getPlayer(), this.canvas.width);
  }

  private handleInput() {
    if (
      (this.inputHandler.isKeyPressed("ArrowUp") ||
      this.inputHandler.isKeyPressed("space")) && this.gameState.getPlayer().getOnGround()
    ) {
      this.gameState.getPlayer().jump();
    }
    if (this.inputHandler.isKeyPressed("ArrowLeft") && this.gameState.getPlayer().getOnGround()) {
      console.log("----pressed left----");
      this.gameState.getPlayer().moveLeft(this.camera);
    }
    if (this.inputHandler.isKeyPressed("ArrowRight") && this.gameState.getPlayer().getOnGround()) {
      this.gameState.getPlayer().moveRight(this.camera);
    }
    // Reset keys if needed
    this.inputHandler.resetKeys();
  }

  render() {
    this.renderer.clearCanvas();

    // Draw objects relative to the camera’s position
    const visibleObjects = [this.gameState.getPlayer(), ...this.gameState.getGameWorld().getObjects()].map(obj => {
      return {
        gameObject : obj,
        renderX: obj.getX() - this.camera.getX(),
        renderY: obj.getY() - this.camera.getY()
      };
    });

    this.renderer.drawGameObjects(visibleObjects);
  }
}

export default Game;
