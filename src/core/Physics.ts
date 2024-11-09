import GameObject from "../objects/GameObject";
import Player from "../objects/Player";

class Physics {
  private gravity: number = 0.1;
  private friction: number = 0.95;

  constructor() {
    console.log("Physics created");
  }

  applyPhysics(gameObjects: GameObject[], canvasHeight: number) {
    gameObjects.forEach((gameObject) => {
      gameObject.setX(gameObject.getX() + gameObject.getVx());
      gameObject.setY(gameObject.getY() + gameObject.getVy());
      this.applyGravity(gameObject, canvasHeight);
      this.applyFriction(gameObject);
    });
    this.applyCollisions(gameObjects);
  }

  applyFriction(gameObject: GameObject) {
    if (gameObject instanceof Player) {
      if (gameObject.getOnGround()) {
        gameObject.setVx(gameObject.getVx() * this.friction);
      }
    } else {
      gameObject.setVx(gameObject.getVx() * this.friction);
    }
  }

  applyGravity(gameObject: GameObject, canvasHeight: number) {
    if (gameObject.getFloating() == false) {
        gameObject.setVy(gameObject.getVy() + this.gravity);
    }
    if (gameObject instanceof Player) {
      if (gameObject.getY() >= canvasHeight - gameObject.getHeight() / 2) {
        gameObject.setY(canvasHeight - gameObject.getHeight() / 2); // Set player to ground level
        gameObject.setVy(0); // Stop falling (no vertical velocity)
        gameObject.setOnGround(true); // Player is on the ground
      }
    } 
  }

  // NEW: Collision handling
  applyCollisions(gameObjects: GameObject[]) {
    gameObjects.forEach((gameObject) => {
      if (gameObject instanceof Player) {
        gameObjects.forEach((otherObject) => {
          if (gameObject !== otherObject && this.isColliding(gameObject, otherObject)) {
            this.resolveCollision(gameObject, otherObject);
          }
        });
      }
    });
  }

  // Simple collision detection (AABB - Axis-Aligned Bounding Box)
  isColliding(obj1: GameObject, obj2: GameObject): boolean {
    return (
      obj1.getX() < obj2.getX() + obj2.getWidth() &&
      obj1.getX() + obj1.getWidth() > obj2.getX() &&
      obj1.getY() < obj2.getY() + obj2.getHeight() &&
      obj1.getY() + obj1.getHeight() > obj2.getY()
    );
  }

  // Handle the collision response for the player (could be extended for other object types)
  resolveCollision(player: Player, otherObject: GameObject) {
    // Basic example: Prevent the player from moving through platforms or walls

    // Vertical collision (e.g., player landing on top of a platform)
    if (player.getVy() > 0 && player.getY() + player.getHeight() / 2 <= otherObject.getY()) {
      player.setY(otherObject.getY() - player.getHeight() / 2); // Set player on top of platform
      player.setVy(0); // Stop vertical movement
      player.setOnGround(true);
    }
    // Horizontal collision (e.g., running into a wall from the side)
    else if (player.getVx() !== 0) {
      if (player.getX() < otherObject.getX()) {
        // Player hits the left side of the other object
        player.setX(otherObject.getX() - player.getWidth() / 2);
      } else {
        // Player hits the right side of the other object
        player.setX(otherObject.getX() + otherObject.getWidth() + player.getWidth() / 2);
      }
      player.setVx(0); // Stop horizontal movement
    }
  }
}


export default Physics;
