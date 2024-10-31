import GameObject from "../objects/GameObject";

export default class Renderer {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawGameObjects(gameObjects: GameObject[]) {
    gameObjects.forEach((gameObject) => {
        gameObject.render(this.ctx); // Call each object's specific render method
    });
  }
}
