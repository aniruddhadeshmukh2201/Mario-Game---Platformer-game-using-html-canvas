
import Player from "../objects/Player";
import Renderer from "../render/Renderer";
import InputHandler from "../utils/InputHandler";
import Physics from "./Physics";
import Camera from "./Camera";
import GameWorld from "./GameWorld";
import config from '../assets/config.json';

class Game {
  canvas: HTMLCanvasElement;

  private inputHandler: InputHandler;
  private renderer: Renderer;
  private physics: Physics;
  private camera: Camera;
  private player: Player;
  private gameWorld: GameWorld;
  
  
  constructor() {
    this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    this.player = new Player(100, 100, 0, 0, 25, 40);
    this.gameWorld = new GameWorld();
    this.gameWorld.initializeWorld(config);
    this.inputHandler = new InputHandler();
    this.renderer = new Renderer(this.canvas);
    this.physics = new Physics();
    this.camera = new Camera(0, 0, 800, 400);
    console.log("Game created");
  }

  public update() {
    this.handleInput();
    this.physics.applyPhysics([this.player, ...this.gameWorld.getObjects()], this.canvas.height, this.camera);
    this.camera.update(this.player, this.canvas.width);
  }

  private handleInput() {
    if (
      (this.inputHandler.isKeyPressed("ArrowUp") ||
      this.inputHandler.isKeyPressed("space")) && this.player.getOnGround()
    ) {
      this.player.jump();
    }
    if (this.inputHandler.isKeyPressed("ArrowLeft") && this.player.getOnGround()) {
      console.log("----pressed left----");
      this.player.moveLeft(this.camera);
    }
    if (this.inputHandler.isKeyPressed("ArrowRight") && this.player.getOnGround()) {
      this.player.moveRight(this.camera);
    }
    // Reset keys if needed
    this.inputHandler.resetKeys();
  }

  render() {
    this.renderer.clearCanvas();

    // Draw objects relative to the camera’s position
    const visibleObjects = [this.player, ...this.gameWorld.getObjects()].map(obj => {
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
