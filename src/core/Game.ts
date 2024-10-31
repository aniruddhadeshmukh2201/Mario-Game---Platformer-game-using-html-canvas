import Mushroom from "../objects/Mushroom";
import Player from "../objects/Player";
import Renderer from "../render/Renderer";
import InputHandler from "../utils/InputHandler";
import Physics from "./Physics";
import Camera from "./Camera";
import GameObject from "../objects/GameObject";

class Game {
  private player: Player;
  private gameObjects: GameObject[] = [];
  private inputHandler: InputHandler;
  private renderer: Renderer;
  private physics: Physics;
  private camera: Camera; 

  constructor() {
    this.player = new Player(0, 0, 0, 0, 10, 10);
    this.gameObjects.push(new Mushroom(10, 10, 0, 0, 10, 10, 'basic'));
    this.inputHandler = new InputHandler();
    this.renderer = new Renderer();
    this.physics = new Physics();
    this.camera = new Camera(0, 0, 800, 600);
  }

  public update() {
    this.handleInput();
    this.physics.applyPhysics( [this.player, ...this.gameObjects] );

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
    console.log("Game rendered");
  }

  handleCollisions() {
    console.log("Collisions handled");
  }
}

export default Game;
