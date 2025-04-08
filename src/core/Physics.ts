import GameObject from "../objects/GameObject";
import PhysicsBody from "../physics/PhysicsBody";

class Physics {
  constructor() {}

  applyPhysics(bodies: PhysicsBody[]) {
    bodies.forEach((body) => {
      body.applyGravity();
      body.applyFriction();
      body.setX(body.getX() + body.getVx());
      body.setY(body.getY() + body.getVy());
    });

    this.applyCollisions(bodies);
  }  
  // TODO : need improvements here.., cant just do two loops
  applyCollisions(bodies: PhysicsBody[]) {
    bodies.forEach((body1: PhysicsBody) => {
      bodies.forEach((body2: PhysicsBody) => {
        if (body1 !== body2 && this.isColliding(body1, body2)) {
          body1.resolveCollision(body2);
          body2.resolveCollision(body1);
        }
      });
    });
  }

  isColliding(obj1: GameObject, obj2: GameObject): boolean {
    return (
      obj1.getRight() > obj2.getLeft() &&
      obj1.getLeft() < obj2.getRight() &&
      obj1.getBottom() > obj2.getTop() &&
      obj1.getTop() < obj2.getBottom()
    );
  }
}

export default Physics;
