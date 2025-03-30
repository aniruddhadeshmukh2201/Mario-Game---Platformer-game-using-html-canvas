import PhysicsBody from "../physics/PhysicsBody";
import GameObject from "./GameObject";

class Platform extends GameObject implements PhysicsBody {
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
  applyGravity(): void {

  }
  applyFriction(): void {
  }
  resolveCollision(other: GameObject): void {
  
  }

  render(ctx : CanvasRenderingContext2D, renderX: number, renderY: number) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      renderX - this.getWidth() / 2,
      renderY - this.getHeight() / 2,
      this.getWidth(),
      this.getHeight()
    );
  }
}

export default Platform;
