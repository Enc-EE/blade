import { Animatable } from "./animation";
import { Controller } from "./controller";

export class MenuBlade implements Animatable {
    private angle: number;
    private isShown = false;
    private isAdded = false;
    private addTimer: number;
    private addTimerSeconds = 2;
    public x: number;
    public y: number;
    private rememberedX = 0;
    private rememberedY = 0;

    public color: string;

    public get controllerName(): string {
        return this.controller.name;
    }

    constructor(private controller: Controller, private onAdd: (blade: MenuBlade) => void, private onRemove: (blade: MenuBlade) => void) {
        this.color = "black";
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.addTimer = 0;
    }

    public update = (timeDiffMs: number) => {
        if (this.isShown) {
            if (this.isAdded) {
                this.angle = this.angle + Math.PI / 9;
                this.angle = this.angle % (Math.PI * 2);
                this.x = this.rememberedX + this.controller.xAxes * 25;
                this.y = this.rememberedY + this.controller.yAxes * 25;

                if (this.controller.yAxes > 0.3) {
                    this.addTimer += this.controller.yAxes * timeDiffMs / 1000;
                    if (this.addTimer >= this.addTimerSeconds) {
                        this.addTimer = 0;
                        this.isShown = false;
                        this.isAdded = false;
                        this.onRemove(this);
                    }
                } else if (this.controller.yAxes < 0.1) {
                    this.addTimer = 0;
                }
            } else {
                if (this.controller.yAxes < -0.3) {
                    this.addTimer -= this.controller.yAxes * timeDiffMs / 1000;

                    if (this.addTimer >= this.addTimerSeconds) {
                        this.isAdded = true;
                        this.addTimer = 0;
                    }
                } else if (this.controller.yAxes > -0.1) {
                    this.addTimer = 0;
                    this.isShown = false;
                    this.onRemove(this);
                }
            }
        } else {
            if (this.controller.yAxes < -0.3) {
                this.isShown = true;
                this.addTimer -= this.controller.yAxes * timeDiffMs / 1000;
                this.onAdd(this);
                this.rememberedX = this.x;
                this.rememberedY = this.y;
            }
        }
    }
    public draw = (ctx: CanvasRenderingContext2D, width?: number, height?: number) => {
        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(this.x, this.y);
        if (this.isAdded) {
            ctx.save();
            ctx.rotate(this.angle);
            ctx.fillRect(-25, -25, 50, 50);
            ctx.restore();
        }

        if (this.isShown && !this.isAdded) {
            ctx.fillRect(-25, 35, 50 / this.addTimerSeconds * this.addTimer, 10);
        }

        if (this.isShown && this.isAdded && this.addTimer > 0) {
            ctx.fillRect(-25, 35, 50 - 50 / this.addTimerSeconds * this.addTimer, 10);
        }

        ctx.restore();
    }
}