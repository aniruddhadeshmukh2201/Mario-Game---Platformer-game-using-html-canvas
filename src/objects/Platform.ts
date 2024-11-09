import GameObject from "./GameObject";

class Platform extends GameObject {
  color: string = "brown";
  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    width: number,
    height: number
  ) {
    super(x, y, vx, vy, width, height, true, true);
  }

  render(ctx : CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.getX() - this.getWidth() / 2,
      this.getY() - this.getHeight() / 2,
      this.getWidth(),
      this.getHeight()
    );
  }
}

export default Platform;
