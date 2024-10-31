import GameObject from "../objects/GameObject";

class Camera {
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // Update camera position based on player movement, if necessary
    update(target: GameObject) {
        this.x = target.getX() - this.width / 2; // Center the camera on the player
        this.y = target.getY() - this.height / 2;
    }
}

export default Camera;
