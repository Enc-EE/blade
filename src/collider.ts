import { Animatable } from "./animation";
import { Blade } from "./blade";

export class Collider implements Animatable {

    constructor(private blades: Blade[], private borderRight: number, private borderBottom: number) {

    }

    public update = (timeDiff: number) => {
        for (let i = 0; i < this.blades.length; i++) {
            const blade = this.blades[i];
            if (blade.x - blade.r < 0) {
                blade.vx = - blade.vx;
                blade.x = blade.r - blade.x + blade.r;
            } else if (blade.x + blade.r > this.borderRight) {
                blade.vx = - blade.vx;
                blade.x = this.borderRight - (blade.x + blade.r - this.borderRight) - blade.r;
            }
            if (blade.y - blade.r < 0) {
                blade.vy = - blade.vy;
                blade.y = blade.r - blade.y + blade.r;
            } else if (blade.y + blade.r > this.borderBottom) {
                blade.vy = - blade.vy;
                blade.y = this.borderBottom - (blade.y + blade.r - this.borderBottom) - blade.r;
            }
        }
    }

    public draw = (ctx: CanvasRenderingContext2D, width?: number, height?: number) => {
    }
}