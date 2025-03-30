import GameObject from "../objects/GameObject";
import Player from "../objects/Player";

class Camera {
  private x: number;
  private y: number;
  private width: number;
  private height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }
  
  enforceCameraBoundary(player: Player) {
    const leftBoundary = this.getX();

    if (player.getX() - player.getWidth() / 2 <= leftBoundary) {
      player.setX(leftBoundary + player.getWidth() / 2);
      player.setVx(0);
    }
  }

  update(target: GameObject, canvasWidth: number) {
    // Only update the camera position if the player moves past the halfway point
    const halfCanvasWidth = canvasWidth / 2;

    // If the player’s x-coordinate is greater than half the canvas, update camera position
    if (target.getVx() > 0 && target.getX() > halfCanvasWidth) {
      this.x = target.getX() - halfCanvasWidth;
    }

    // Keep the camera at the top of the screen (y = 0) or adjust as necessary
    this.y = 0; // Modify if vertical scrolling is desired
    this.enforceCameraBoundary(target as Player);
  }
}

export default Camera;
