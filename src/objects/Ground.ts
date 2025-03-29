import GameObject from "./GameObject";




class Ground extends GameObject {
    color: string = "green";
    constructor(
        x: number,
        y: number,
        vx: number,
        vy: number,
        width: number,
        height: number
    ) {
        super(x, y, vx, vy, width, height, true, true);
    }
    
    render(ctx : CanvasRenderingContext2D, renderX: number, renderY: number) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
        this.getX() - this.getWidth() / 2,
        this.getY() - this.getHeight() / 2,
        this.getWidth(),
        this.getHeight()
        );
    }
}


export default Ground;