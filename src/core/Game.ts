import Mushroom from "../objects/Mushroom";
import Player from "../objects/Player";
import Renderer from "../render/Renderer";
import InputHandler from "../utils/InputHandler";
import Physics from "./Physics";
import Camera from "./Camera";
import GameObject from "../objects/GameObject";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  worldWidth: number;

  private player: Player;
  private gameObjects: GameObject[] = [];
  private inputHandler: InputHandler;
  private renderer: Renderer;
  private physics: Physics;
  private camera: Camera;

  constructor() {
    this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.worldWidth = 2000;
    this.player = new Player(0, 0, 0, 0, 10, 10);
    this.gameObjects.push(new Mushroom(10, 10, 0, 0, 10, 10, "basic"));
    this.inputHandler = new InputHandler();
    this.renderer = new Renderer(this.ctx);
    this.physics = new Physics();
    this.camera = new Camera(0, 0, 800, 600);
  }

  public update() {
    this.handleInput();
    this.physics.applyPhysics([this.player, ...this.gameObjects]);
  }

  private handleInput() {
    if (
      this.inputHandler.isKeyPressed("ArrowUp") ||
      this.inputHandler.isKeyPressed("Space")
    ) {
      this.player.jump();
    }
    if (this.inputHandler.isKeyPressed("ArrowLeft")) {
      this.player.moveLeft();
    }
    if (this.inputHandler.isKeyPressed("ArrowRight")) {
      this.player.moveRight();
    }
    // Reset keys if needed
    this.inputHandler.resetKeys();
  }

  render() {
    const visibleObjects = [this.player, ...this.gameObjects].filter((obj) =>
      this.isVisible(obj)
    );
    this.renderer.drawGameObjects(visibleObjects);
  }

  handleCollisions() {
    console.log("Collisions handled");
  }

  private isVisible(obj: GameObject): boolean {
    // Check if the object is within the camera view
    let x = obj.getX();
    let y = obj.getY();
    let width = obj.getWidth();
    let height = obj.getHeight();
    let cameraX = this.camera.getX();
    let cameraY = this.camera.getY();
    let cameraWidth = this.camera.getWidth();
    let cameraHeight = this.camera.getHeight();

    return (
      x < cameraX + cameraWidth &&
      x + width > cameraX &&
      y < cameraY + cameraHeight &&
      y + height > cameraY
    );
  }
}

export default Game;
