import GameObject from "./GameObject";

class Player extends GameObject {
  color: string = "red";
  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    width: number,
    height: number
  ) {
    super(x, y, vx, vy, width, height, false, false);
  }

  jump() {
    super.setVy(super.getVy() - 1);
  }

  moveLeft() {
    super.setVx(super.getVx() - 1);
  }

  moveRight() {
    super.setVx(super.getVx() + 1);
  }

  render(ctx: CanvasRenderingContext2D) {
    // Example logic using a sprite or simple shape
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.getX() - this.getWidth() / 2,
      this.getY() - this.getHeight() / 2,
      this.getWidth(),
      this.getHeight()
    );
  }
}

export default Player;
