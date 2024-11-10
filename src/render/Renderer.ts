import GameObject from "../objects/GameObject";

type RenderObject = { 
  gameObject: GameObject;
  renderX: number;
  renderY: number;
}

export default class Renderer {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }


  drawGameObjects( renderObjects : RenderObject[]) {
    renderObjects.forEach((renderObject) => {
      renderObject.gameObject.render(this.ctx, renderObject.renderX, renderObject.renderY); // Call each object's specific render method
    });
  }
}
