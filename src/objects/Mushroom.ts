import GameObject from "./GameObject";

class Mushroom extends GameObject {
  private type: any;
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

  getType() {
    return this.type;
  }

  setType(type: string) {
    this.type = type;
  }


  render(ctx : CanvasRenderingContext2D) {
    // Render mushroom based on its type
  }
}

export default Mushroom;
