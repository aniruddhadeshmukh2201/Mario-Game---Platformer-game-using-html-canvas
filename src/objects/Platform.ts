import GameObject from "./GameObject";

class Platform extends GameObject {
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

  render(ctx : CanvasRenderingContext2D) {}
}

export default Platform;
