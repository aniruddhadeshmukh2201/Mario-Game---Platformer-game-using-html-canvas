
import Player from "../objects/Player";
import Renderer from "../render/Renderer";
import InputHandler from "../utils/InputHandler";
import Physics from "./Physics";
import Camera from "./Camera";
import GameObject from "../objects/GameObject";
import GameWorld from "./GameWorld";
import WorldBuilder from "./WorldBuilder";
import GameObjectFactory from "../objects/GameObjectFactory";
import config from '../assets/config.json';

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  private player: Player;
  private gameObjectFactory: GameObjectFactory;
  private gameWorld: GameWorld;
  private worldBuilder: WorldBuilder;
  private inputHandler: InputHandler;
  private renderer: Renderer;
  private physics: Physics;
  private camera: Camera;

  constructor() {
    this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.player = new Player(100, 100, 0, 0, 25, 40);
    this.gameObjectFactory = new GameObjectFactory();
    this.worldBuilder = new WorldBuilder(this.gameObjectFactory);
    this.gameWorld = new GameWorld(this.worldBuilder);
    this.gameWorld.initializeWorld(config);
    this.inputHandler = new InputHandler();
    this.renderer = new Renderer(this.ctx);
    this.physics = new Physics();
    this.camera = new Camera(0, 0, 800, 600);
    console.log("Game created");
  }

  public update() {
    this.handleInput();
    this.physics.applyPhysics([this.player, ...this.gameWorld.getObjects()], this.canvasHeight);
  }

  private handleInput() {
    if (
      (this.inputHandler.isKeyPressed("ArrowUp") ||
      this.inputHandler.isKeyPressed("space")) && this.player.getOnGround()
    ) {
      this.player.jump();
    }
    if (this.inputHandler.isKeyPressed("ArrowLeft") && this.player.getOnGround()) {
      this.player.moveLeft();
    }
    if (this.inputHandler.isKeyPressed("ArrowRight") && this.player.getOnGround()) {
      this.player.moveRight();
    }
    // Reset keys if needed
    this.inputHandler.resetKeys();
  }

  render() {
    // const visibleObjects = [this.player, ...this.gameWorld.getObjects()].filter(
    //   (obj) => this.isVisible(obj)
    // );
    this.renderer.clearCanvas();
    this.renderer.drawGameObjects([ this.player, ...this.gameWorld.getObjects()]);
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
