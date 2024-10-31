import GameObject from "./GameObject";

class Collectible extends GameObject {
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

  render() {}
}

export default Collectible;
