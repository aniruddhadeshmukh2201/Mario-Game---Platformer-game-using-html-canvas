import GameObject from "../objects/GameObject";

interface PhysicsBody extends GameObject {
  applyGravity(): void;
  applyFriction(): void;
  // TODO : need to use Dispatch design pattern to avoid using instanceof
  resolveCollision(other: GameObject): void;
}


export default PhysicsBody;