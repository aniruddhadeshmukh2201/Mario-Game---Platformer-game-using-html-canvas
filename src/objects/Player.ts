import GameObject from "./GameObject";

class Player extends GameObject {
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

  jump() {
    super.setVy(super.getVy() - 1); 
  }

  moveLeft() {
    super.setVx( super.getVx()-1);
  }

  moveRight() {
    super.setVx( super.getVx()+1);
  }

  render() {
    // Draw player sprite
  }
}

export default Player;
