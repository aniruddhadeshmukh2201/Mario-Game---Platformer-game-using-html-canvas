import GameState, { GameStatus } from "../core/GameState";
import PhysicsBody from "../physics/PhysicsBody";
import GameObject from "./GameObject";
import Mushroom from "./Mushroom";

class Player extends GameObject implements PhysicsBody {
  color: string = "red";
  private OnGround: boolean = false;
  private gameState: GameState;
  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    width: number,
    height: number,
    gameState: GameState
  ) {
    super(x, y, vx, vy, width, height, false, false);
    this.gameState = gameState;
  }

  resolveCollision(other: GameObject) {
    // Get previous position before resolving the collision
    const previousY = this.getY() - this.getVy();
    const previousX = this.getX() - this.getVx();

    // Vertical collision check
    if (
      this.getBottom() > other.getTop() && // Player's bottom is below the platform's top
      previousY + this.getHeight() / 2 <= other.getTop() // Was the player above the platform before?
    ) {
      // Land on top of the platform
      this.setY(other.getTop() - this.getHeight() / 2);
      this.setVy(0); // Stop vertical movement
      this.setOnGround(true);
    } else if (
      this.getTop() < other.getBottom() && // Player's top is above the platform's bottom
      previousY - this.getHeight() / 2 >= other.getBottom() // Was the player below the platform before?
    ) {
      // Hitting the ceiling
      this.setY(other.getBottom() + this.getHeight() / 2);
      this.setVy(0); // Stop upward movement
    } else {
      // Horizontal collision (wall)

      if (other instanceof Mushroom) {
        console.log("💀 Player collided with a Mushroom! Game Over.");
        this.gameState.loseLevel(); // ✅ Notify GameState
      }
      if (
        this.getRight() > other.getLeft() && // Player's right side is past the object's left side
        previousX + this.getWidth() / 2 <= other.getLeft() // Was the player to the left before?
      ) {
        // Hitting the left side of the object
        this.setX(other.getLeft() - this.getWidth() / 2);
      } else if (
        this.getLeft() < other.getRight() && // Player's left side is before the object's right side
        previousX - this.getWidth() / 2 >= other.getRight() // Was the player to the right before?
      ) {
        // Hitting the right side of the object
        this.setX(other.getRight() + this.getWidth() / 2);
      }

      // Stop horizontal movement on collision
      this.setVx(0);
    }
  }

  applyGravity() {
    if (!this.getFloating()) this.setVy(this.getVy() + 0.1);
  }

  applyFriction() {
    if (this.getOnGround()) this.setVx(this.getVx() * 0.95);
  }

  setOnGround(onGround: boolean) {
    this.OnGround = onGround;
  }

  getOnGround() {
    return this.OnGround;
  }

  jump() {
    if (this.OnGround) {
      this.setOnGround(false);
      super.setVy(-5);
    }
  }

  moveLeft(speedInAir: number) {
    if (this.getOnGround()) {
      super.setVx(-3);
      return;
    }
    super.setVx(speedInAir);
  }

  moveRight(speedInAir: number) {
    if (this.getOnGround()) {
      super.setVx(3);
      return;
    }
    super.setVx(speedInAir);
  }

  render(ctx: CanvasRenderingContext2D, renderX: number, renderY: number) {
    // Example logic using a sprite or simple shape
    // console.log("player position::::", this.getX(), this.getY() );
    ctx.fillStyle = this.color;
    ctx.fillRect(
      renderX - this.getWidth() / 2,
      renderY - this.getHeight() / 2,
      this.getWidth(),
      this.getHeight()
    );
    const winPosition = this.gameState.getWinPosition();
    if (this.getX() >= winPosition) {
      this.gameState.winLevel();
    }
  }
}

export default Player;
