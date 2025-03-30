import GameObject from "../objects/GameObject";

interface PhysicsBody {
  applyGravity(): void;
  applyFriction(): void;
  resolveCollision(other: GameObject): void;
}


export default PhysicsBody;