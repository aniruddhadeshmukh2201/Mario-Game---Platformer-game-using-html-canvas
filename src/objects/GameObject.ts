class GameObject {
  private x: number;
  private y: number;
  private vx: number;
  private vy: number;
  private width: number;
  private height: number;
  private passable: boolean;
  private floating: boolean;
  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    width: number,
    hieght: number,
    passable: boolean,
    floating: boolean
  ) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.width = width;
    this.height = hieght;
    this.passable = passable;
    this.floating = floating;
  }

  getLeft() {
    return this.x - this.width / 2;
  }

  getRight() {
    return this.x + this.width / 2;
  }

  getTop() {
    return this.y - this.height / 2;
  }

  getBottom() {
    return this.y + this.height / 2;
  }

  getPassable() {
    return this.passable;
  }

  setPassable(passable: boolean) {
    this.passable = passable;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  getVx() {
    return this.vx;
  }

  getVy() {
    return this.vy;
  }

  setVx(vx: number) {
    this.vx = vx;
  }

  setVy(vy: number) {
    this.vy = vy;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  getFloating() {
    return this.floating;
  }

  setFloating(floating: boolean) {
    this.floating = floating;
  }

  render(ctx : CanvasRenderingContext2D, renderX: number, renderY: number) {
    // Render object
    
  }
}

export default GameObject;
