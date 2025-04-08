import PhysicsBody from "../physics/PhysicsBody";
import GameObject from "./GameObject";

class Mushroom extends GameObject implements PhysicsBody {
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
    super(x, y, vx, vy, width, height, false, false);
    this.type = type;
  }
  applyGravity(): void {
    if (!this.OnGround) {
      this.setVy(this.getVy() + 0.1); // Simulating gravity
    }
  }

  applyFriction(): void {
    // if (this.OnGround) {
    //   this.setVx(this.getVx() * 0.99); // Reduce speed gradually
    // }
  }

  resolveCollision(other: GameObject): void {
    const previousY = this.getY() - this.getVy();
    const previousX = this.getX() - this.getVx();

    if(this.getPassable() || other.getPassable() ) {
      return;
    }

    // **Vertical Collision (ground or ceiling)**
    if (this.getBottom() > other.getTop() && previousY + this.getHeight() / 2 <= other.getTop()) {
      // Landing on top of an object
      this.setY(other.getTop() - this.getHeight() / 2);
      this.setVy(0);
      this.setOnGround(true);
    } else if (this.getTop() < other.getBottom() && previousY - this.getHeight() / 2 >= other.getBottom()) {
      // Hitting a ceiling
      this.setY(other.getBottom() + this.getHeight() / 2);
      this.setVy(0);
    } else {
      // **Horizontal Collision (walls)**
      if (this.getRight() > other.getLeft() && previousX + this.getWidth() / 2 <= other.getLeft()) {
        // Hitting the left side of an object
        this.setX(other.getLeft() - this.getWidth() / 2);
        this.setVx(-this.getVx()); // Bounce back
      } else if (this.getLeft() < other.getRight() && previousX - this.getWidth() / 2 >= other.getRight()) {
        // Hitting the right side of an object
        this.setX(other.getRight() + this.getWidth() / 2);
        this.setVx(-this.getVx()); // Bounce back
      }
    }
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
    if(!this.isVisible()) {
      return ;
    }
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
