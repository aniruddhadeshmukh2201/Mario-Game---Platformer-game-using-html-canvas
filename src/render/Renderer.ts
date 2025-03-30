import GameState from "../core/GameState";
import GameObject from "../objects/GameObject";

type RenderObject = {
  gameObject: GameObject;
  renderX: number;
  renderY: number;
};

export default class Renderer {
  private ctx: CanvasRenderingContext2D;
  private onNextLevel: () => void; // Callback function

  constructor(canvas: HTMLCanvasElement, onNextLevel: () => void) {
    this.ctx = canvas.getContext("2d")!;
    this.onNextLevel= onNextLevel;
  }

  clearCanvas() {
    this.ctx.clearRect(
      0,
      0,
      this.ctx.canvas.clientWidth,
      this.ctx.canvas.clientHeight
    );
  }

  drawGameObjects(renderObjects: RenderObject[]) {
    renderObjects.forEach((renderObject) => {
      renderObject.gameObject.render(
        this.ctx,
        renderObject.renderX,
        renderObject.renderY
      ); // Call each object's specific render method
    });
  }

  renderLostOverlay() {
    const ctx = this.ctx;
    const { width, height } = this.ctx.canvas;

    // Dark transparent overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, width, height);

    // "Game Over" Text
    ctx.fillStyle = "white";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", width / 2, height / 2 - 50);

    // Play Again Button
    ctx.fillStyle = "red";
    const buttonWidth = 150;
    const buttonHeight = 50;
    const buttonX = width / 2 - buttonWidth / 2;
    const buttonY = height / 2;

    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

    // Button Text
    ctx.fillStyle = "white";
    ctx.font = "bold 20px Arial";
    ctx.fillText("Play Again", width / 2, buttonY + 30);

    // Add click event listener (only once)
    this.ctx.canvas.addEventListener("click", this.handlePlayAgainClick);
  }

  handlePlayAgainClick = (event: MouseEvent) => {
    const buttonWidth = 150;
    const buttonHeight = 50;
    const buttonX = this.ctx.canvas.width / 2 - buttonWidth / 2;
    const buttonY = this.ctx.canvas.height / 2;

    // Get the canvas bounding rect
    const rect = this.ctx.canvas.getBoundingClientRect();

    // Convert click coordinates to canvas space
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (
      clickX >= buttonX &&
      clickX <= buttonX + buttonWidth &&
      clickY >= buttonY &&
      clickY <= buttonY + buttonHeight
    ) {
      console.log("Play Again button clicked!");
      this.ctx.canvas.removeEventListener("click", this.handlePlayAgainClick);
      window.location.reload(); 
    }
  };

  renderWinOverlay() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Arial";
    this.ctx.fillText("Level Complete!", this.ctx.canvas.width / 2 - 100, 200);
  
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(this.ctx.canvas.width / 2 - 85, 250, 200, 50);
  
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Next Level", this.ctx.canvas.width / 2 - 55, 285);
  
    this.ctx.canvas.removeEventListener("click", this.handleNextLevelClick); // Remove old
    this.ctx.canvas.addEventListener("click", this.handleNextLevelClick);    // Add new
  }
  

  handleNextLevelClick = (event: MouseEvent) => {
    const rect = this.ctx.canvas.getBoundingClientRect(); // Get canvas position
    const canvasX = event.clientX - rect.left; // Adjust mouse X
    const canvasY = event.clientY - rect.top;  // Adjust mouse Y
  
    const buttonX = this.ctx.canvas.width / 2 - 85;
    const buttonY = 250;
    const buttonWidth = 200;
    const buttonHeight = 50;
  
    if (
      canvasX >= buttonX &&
      canvasX <= buttonX + buttonWidth &&
      canvasY >= buttonY &&
      canvasY <= buttonY + buttonHeight
    ) {
      this.ctx.canvas.removeEventListener("click", this.handleNextLevelClick);
      this.onNextLevel(); // Callback to GameState
    }
  };
  
  
}
