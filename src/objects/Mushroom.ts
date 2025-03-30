import GameObject from "./GameObject";

class Mushroom extends GameObject {
  private type: any;
  color: string = "red";
  private OnGround: boolean = false;
  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    width: number,
    height: number,
    type: string
  ) {
    super(x, y, vx, vy, width, height, true, false);
    this.type = type;
  }

  setOnGround(onGround: boolean) {
    this.OnGround = onGround;
  }

  getOnGround() {
    return this.OnGround;
  }

  getType() {
    return this.type;
  }

  setType(type: string) {
    this.type = type;
  }


  render(ctx : CanvasRenderingContext2D, renderX: number, renderY: number) {
    // Render mushroom based on its type
    ctx.fillStyle = this.color;
    ctx.fillRect(
      renderX - this.getWidth() / 2,
      renderY - this.getHeight() / 2,
      this.getWidth(),
      this.getHeight()
    );
  }
}

export default Mushroom;
