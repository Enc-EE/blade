import { Animatable } from "./animation";

export class Blade implements Animatable {
    private x: number;
    private y: number;
    private vx: number;
    private vy: number;
    private angle: number;
    private moveDown: number;
    private moveRight: number;
    private moveUp: number;
    private moveLeft: number;


    constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.moveDown = 0;
        this.moveRight = 0;
        this.moveUp = 0;
        this.moveLeft = 0;

        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            if (event.keyCode == 37) {
                this.moveLeft = 1;
            }
            if (event.keyCode == 38) {
                this.moveUp = 1;
            }
            if (event.keyCode == 39) {
                this.moveRight = 1;
            }
            if (event.keyCode == 40) {
                this.moveDown = 1;
            }
        });

        document.addEventListener('keyup', (event) => {
            const keyName = event.key;
            if (event.keyCode == 37) {
                this.moveLeft = 0;
            }
            if (event.keyCode == 38) {
                this.moveUp = 0;
            }
            if (event.keyCode == 39) {
                this.moveRight = 0;
            }
            if (event.keyCode == 40) {
                this.moveDown = 0;
            }
        });
    }

    public update = (timeDiffMs: number) => {

        this.angle = this.angle + Math.PI / 9;
        this.angle = this.angle % (Math.PI * 2);
        this.vx += -this.moveLeft + this.moveRight;
        this.vy += -this.moveUp + this.moveDown;

        this.x += this.vx;
        this.y += this.vy;
    }
    public draw = (ctx: CanvasRenderingContext2D, width?: number, height?: number) => {
        ctx.fillStyle = "black";
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillRect(-25, -25, 50, 50);
        ctx.restore();
    }
}