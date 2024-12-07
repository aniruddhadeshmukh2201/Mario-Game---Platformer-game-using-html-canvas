import GameObject from "../objects/GameObject";
import Player from "../objects/Player";
import Camera from "./Camera";

class Physics {
  private gravity: number = 0.1;
  private friction: number = 0.95;

  constructor() {
    console.log("Physics created");
  }

  applyPhysics(gameObjects: GameObject[], canvasHeight: number, camera: Camera) {
    gameObjects.forEach((gameObject) => {
      this.updatePostion(gameObject);
      this.applyGravity(gameObject, canvasHeight);
      this.applyFriction(gameObject);
    });

    this.enforceCameraBoundary(gameObjects, camera);
    this.applyCollisions(gameObjects);
    this.updateGroundStatus(gameObjects);
  }

  updatePostion(gameObject: GameObject) {
    gameObject.setX(gameObject.getX() + gameObject.getVx());
    gameObject.setY(gameObject.getY() + gameObject.getVy());
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
    if (!gameObject.getFloating()) {
      gameObject.setVy(gameObject.getVy() + this.gravity);
    }
    if (gameObject instanceof Player && gameObject.getOnGround()) {
      gameObject.setVy(0);
    } else if (gameObject.getY() >= canvasHeight - gameObject.getHeight() / 2) {
      gameObject.setY(canvasHeight - gameObject.getHeight() / 2);
      gameObject.setVy(0);
      if (gameObject instanceof Player) {
        gameObject.setOnGround(true);
      }
    }
  }

  enforceCameraBoundary(gameObjects: GameObject[], camera: Camera) {
    gameObjects.forEach((gameObject) => {
      if (gameObject instanceof Player) {
        const leftBoundary = camera.getX() ;
        
        // Prevent player from moving left of the camera boundary
        if (gameObject.getX() - gameObject.getWidth() / 2 <= leftBoundary) {
          gameObject.setX(leftBoundary + gameObject.getWidth() / 2);
          gameObject.setVx(0); // Stop or push right
        }
      }
    });
  }


  applyCollisions(gameObjects: GameObject[]) {
    gameObjects.forEach((gameObject) => {
      if (gameObject instanceof Player) {
        gameObjects.forEach((otherObject) => {
          if (
            gameObject !== otherObject &&
            this.isColliding(gameObject, otherObject)
          ) {
            this.resolveCollision(gameObject, otherObject);
          }
        });
      }
    });
  }

  isColliding(obj1: GameObject, obj2: GameObject): boolean {
    // Check if obj1's right edge is past obj2's left edge and obj1's left edge is before obj2's right edge
    const horizontalOverlap =
      obj1.getRight() > obj2.getLeft() && obj1.getLeft() < obj2.getRight();      

    // Check if obj1's bottom edge is below obj2's top edge and obj1's top edge is above obj2's bottom edge
    const verticalOverlap =
      obj1.getBottom() > obj2.getTop() && obj1.getTop() < obj2.getBottom();

    // Objects are colliding if both horizontal and vertical overlaps are true
    return horizontalOverlap && verticalOverlap;
  }

  

  // Handle the collision response for the player (could be extended for other object types)
  resolveCollision(player: Player, otherObject: GameObject) {
    // Basic example: Prevent the player from moving through platforms or walls
    // if(otherObject.getWidth() == 800) console.log("-------resolveCollision----",player.getVy(),  player.getVy() > 0, player.getBottom() >= otherObject.getTop());
    
    
    // Vertical collision (e.g., player landing on top of a platform)
    if (player.getVy() >= 0 && player.getBottom() >= otherObject.getTop()) {
      console.log('vertical collision ');
      player.setY(otherObject.getTop() - player.getHeight() / 2); // Set player on top of platform
      player.setVy(0); // Stop vertical movement
      player.setOnGround(true);
    } else if(player.getVy() < 0 && player.getTop() <= otherObject.getBottom()){
      player.setY(otherObject.getBottom() + player.getHeight() / 2); // Set player on top of platform
      player.setVy(0); // Stop vertical movement
    }


    // Horizontal collision (e.g., running into a wall from the side)
    else {
      if (
        player.getRight() >= otherObject.getLeft() &&
        player.getRight() <= otherObject.getRight()
      ) {
        console.log("left");
        // Player hits the left side of the other object
        player.setX(
          otherObject.getX() -
            player.getWidth() / 2 -
            otherObject.getWidth() / 2
        );
      } else if (
        player.getLeft() < otherObject.getRight() &&
        player.getLeft() > otherObject.getLeft()
      ) {
        console.log("right");
        // Player hits the right side of the other object
        player.setX(
          otherObject.getX() +
            otherObject.getWidth() / 2 +
            player.getWidth() / 2
        );
      }
      player.setVx(0); // Stop horizontal movement
    }
  }

  updateGroundStatus(gameObjects: GameObject[]) {
    gameObjects.forEach((gameObject) => {
        if (gameObject instanceof Player) {
            let isGrounded = false;

            gameObjects.forEach((otherObject) => {
                if (otherObject !== gameObject) {
                    const isHorizontallyAligned =
                        gameObject.getRight() > otherObject.getLeft() &&
                        gameObject.getLeft() < otherObject.getRight();
                    const isVerticallyAligned =
                        Math.abs(gameObject.getBottom() - otherObject.getTop()) < 1; // Small tolerance

                    if (isHorizontallyAligned && isVerticallyAligned) {
                        isGrounded = true; // Player is standing on a platform
                    }

                    
                }
            });

            gameObject.setOnGround(isGrounded); // Update grounded status based on current position
        }
    });
}

}

export default Physics;
