import GameObject from "../objects/GameObject";
import Player from "../objects/Player";

class Physics {
  private gravity: number = 0.1;
  private friction: number = 0.9;

  constructor() {
    console.log("Physics created");
  }

  applyPhysics(gameObjects: GameObject[], canvasHeight: number) {
    gameObjects.forEach((gameObject) => {
      gameObject.setX(gameObject.getX() + gameObject.getVx());
      gameObject.setY(gameObject.getY() + gameObject.getVy());

      // Apply gravity
      gameObject.setVy(gameObject.getVy() + this.gravity);

      // Check if it's a Player object
      if (gameObject instanceof Player) {
        // Apply friction only if the player is grounded (on a platform or the ground)
        if (gameObject.getOnGround()) {
          // Apply friction to horizontal velocity if the player is on the ground or a platform
          gameObject.setVx(gameObject.getVx() * this.friction);
        }
        // Ensure player doesn't fall below the canvas height (ground level)
        if (gameObject.getY() >= canvasHeight - gameObject.getHeight() / 2) {
          gameObject.setY(canvasHeight - gameObject.getHeight() / 2); // Set player to ground level
          gameObject.setVy(0); // Stop falling (no vertical velocity)
          gameObject.setOnGround(true); // Player is on the ground
        } else {
          gameObject.setVy(gameObject.getVy() + this.gravity);
        }
      } else {
        // For other objects, just apply gravity and friction (if needed)
        gameObject.setVy(gameObject.getVy() + this.gravity);
        gameObject.setVx(gameObject.getVx() * this.friction);
      }
    });
  }
}

export default Physics;
