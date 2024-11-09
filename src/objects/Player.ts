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
    this.setOnGround(false);
    super.setVy( - 5);
  }

  moveLeft() {
    super.setVx( -3 );
  }

  moveRight() {
    super.setVx( 3 );
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
