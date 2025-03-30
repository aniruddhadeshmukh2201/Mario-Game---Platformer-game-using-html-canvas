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

    const ctx = this.ctx;
    const { width, height } = this.ctx.canvas;

    // Dark transparent overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, width, height);

    // "Game Over" Text
    ctx.fillStyle = "white";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Level Complete!", width / 2, height / 2 - 50);

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
    ctx.fillText("Next Level", width / 2, buttonY + 30);



  
    this.ctx.canvas.removeEventListener("click", this.handleNextLevelClick); // Remove old
    this.ctx.canvas.addEventListener("click", this.handleNextLevelClick);    // Add new
  }
  

  handleNextLevelClick = (event: MouseEvent) => {


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
      this.ctx.canvas.removeEventListener("click", this.handleNextLevelClick);
      this.onNextLevel(); // Callback to GameState
    }
  };
  
  
}
