import Camera from "../core/Camera";
import GameObject from "./GameObject";

class Player extends GameObject {
  color: string = "red";
  private OnGround: boolean = false;
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

  moveLeft(camera: Camera) {
    super.setVx(-3);
  }

  moveRight(camera: Camera) {
    super.setVx(3);
  }

  render(ctx: CanvasRenderingContext2D, renderX: number, renderY: number) {
    // Example logic using a sprite or simple shape
    ctx.fillStyle = this.color;
    ctx.fillRect(
      renderX - this.getWidth() / 2,
      renderY - this.getHeight() / 2,
      this.getWidth(),
      this.getHeight()
    );
  }
}

export default Player;
