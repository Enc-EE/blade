import { Animatable } from "./enc/animation";
import { Controller } from "./enc/controller";

export class Blade implements Animatable {
    public x: number;
    public y: number;
    public bladeNumber: number;
    public vx: number;
    public vy: number;
    public r: number;
    private startRotations: number;
    private rotations: number;
    private angle: number;
    public m: number;
    private f: number;
    private A: number;
    private cw: number;
    private p: number;

    constructor(private controller: Controller) {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.m = 0.1;
        this.f = 463;
        this.r = 25;
        this.startRotations = 2124;
        this.rotations = this.startRotations;

        this.A = 0.01;
        this.cw = 0.05;
        this.p = 1;
    }

    public collision() {
        var damage = 24 + (this.vx * this.vx + this.vy * this.vy) / 1492;
        this.rotations -= damage;
        if (this.rotations < 0) {
            this.rotations = 0;
        }
    }

    public update = (timeDiff: number) => {
        if (this.rotations > 0) {
            var rotate = this.rotations / 1000 * timeDiff * Math.PI * 2
            this.angle = this.angle + rotate;
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
    }

    public draw = (ctx: CanvasRenderingContext2D, width?: number, height?: number) => {

        var life = this.rotations / this.startRotations * width / 4;
        switch (this.bladeNumber) {
            case 1:
                ctx.fillStyle = "red";
                ctx.fillRect(0, 0, life, 30);
                break;
            case 2:
                ctx.fillStyle = "green";
                ctx.fillRect(width, 0, -life, 30);
                break;
            case 3:
                ctx.fillStyle = "blue";
                ctx.fillRect(0, height, life, -30);
                break;
            case 4:
                ctx.fillStyle = "orange";
                ctx.fillRect(width, height, -life, -30);
                break;
            default:
                ctx.fillStyle = "black";
                break;
        }

        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        var cubeSize = Math.sqrt(this.r * this.r / 2)
        ctx.fillRect(-cubeSize, -cubeSize, cubeSize * 2, cubeSize * 2);
        ctx.restore();
    }
}