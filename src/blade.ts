import { Animatable } from "./animation";
import { Controller } from "./controller";

export class Blade implements Animatable {
    private x: number;
    private y: number;
    private vx: number;
    private vy: number;
    private angle: number;

    constructor(private controller: Controller, private color: string) {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
    }

    public update = (timeDiffMs: number) => {
        this.angle = this.angle + Math.PI / 9;
        this.angle = this.angle % (Math.PI * 2);
        this.vx += this.controller.xAxes / 600;
        this.vy += this.controller.yAxes / 600;

        this.x += this.vx * timeDiffMs;
        this.y += this.vy * timeDiffMs;
    }
    public draw = (ctx: CanvasRenderingContext2D, width?: number, height?: number) => {
        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillRect(-25, -25, 50, 50);
        ctx.restore();
    }
}