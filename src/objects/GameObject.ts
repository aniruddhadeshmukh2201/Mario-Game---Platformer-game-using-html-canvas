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

  render() {
    // Default render method
  }
}

export default GameObject;
