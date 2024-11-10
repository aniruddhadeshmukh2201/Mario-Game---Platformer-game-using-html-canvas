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

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    update(target: GameObject, canvasWidth: number) {
        // Only update the camera position if the player moves past the halfway point
        const halfCanvasWidth = canvasWidth / 2;

        // If the player’s x-coordinate is greater than half the canvas, update camera position
        if (target.getVx() > 0 && target.getX() > halfCanvasWidth) {
            this.x = target.getX() - halfCanvasWidth;
        }

        // Keep the camera at the top of the screen (y = 0) or adjust as necessary
        this.y = 0; // Modify if vertical scrolling is desired
    }
}

export default Camera;
