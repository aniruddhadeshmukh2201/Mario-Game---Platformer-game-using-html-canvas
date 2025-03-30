import GameObject from "../objects/GameObject";

interface PhysicsBody extends GameObject {
  applyGravity(): void;
  applyFriction(): void;
  resolveCollision(other: GameObject): void;
}


export default PhysicsBody;