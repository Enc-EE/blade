import { Animatable } from "./animation";
import { Controller } from "./controller";

export class Blade implements Animatable {
    public x: number;
    public y: number;
    public color: string
    public vx: number;
    public vy: number;
    public r: number;
    private angle: number;
    private m: number;
    private f: number;
    private A: number;
    private cw: number;
    private p: number;

    constructor(private controller: Controller) {
        this.x = 0;
        this.y = 0;
        this.color = "black";
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.m = 0.1;
        this.f = 463;
        this.r = 25;

        this.A = 0.01;
        this.cw = 0.05;
        this.p = 1;
    }

    public update = (timeDiff: number) => {
        this.angle = this.angle + Math.PI / 9;
        this.angle = this.angle % (Math.PI * 2);

        var fFrictionX = 0.5 * this.A * this.cw * this.p * this.vx * Math.abs(this.vx);
        var fFrictionY = 0.5 * this.A * this.cw * this.p * this.vy * Math.abs(this.vy);

        var ax = this.f * this.controller.xAxes - fFrictionX / this.m;
        var ay = this.f * this.controller.yAxes - fFrictionY / this.m;

        this.vx += ax * timeDiff;
        this.vy += ay * timeDiff;

        this.x += this.vx * timeDiff;
        this.y += this.vy * timeDiff;

    }

    public draw = (ctx: CanvasRenderingContext2D, width?: number, height?: number) => {
        ctx.fillStyle = this.color;
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        var cubeSize = Math.sqrt(this.r * this.r / 2)
        ctx.fillRect(-cubeSize, -cubeSize, cubeSize * 2, cubeSize * 2);
        ctx.restore();
    }
}