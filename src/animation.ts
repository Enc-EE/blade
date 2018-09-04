type AnimationFunction = (ctx: CanvasRenderingContext2D, width?: number, height?: number) => void;
type UpdateFunction = (timeDiffMs: number) => void;

export interface Animatable {
    update: (timeDiffMs: number) => void;
    draw: (ctx: CanvasRenderingContext2D, width?: number, height?: number) => void;
}

export class Animation {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    public animatables: Animatable[] = [];

    private constructor() { }

    public static createInBody(): Animation {
        document.body.parentElement.style.height = "100%";
        document.body.style.height = "100%";
        document.body.style.margin = "0";
        document.body.style.overflow = "hidden";

        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        canvas.style.width = "100%"
        canvas.style.height = "100%";

        var animation = new Animation();
        animation.canvas = canvas;
        animation.ctx = canvas.getContext('2d');

        animation.startAnimation();
        animation.resize();
        return animation;
    }

    public resize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    public startAnimation() {
        this.lastFrameTime = Date.now();
        this.animate();
    }

    private lastFrameTime: number;
    private fps = 40;
    private fpsInterval = 1000 / this.fps;

    private animate = () => {
        requestAnimationFrame(this.animate);

        var now = Date.now();
        var elapsed = now - this.lastFrameTime;

        if (elapsed > this.fpsInterval) {
            this.lastFrameTime = now;

            for (const animatable of this.animatables) {
                animatable.update(elapsed);
            }
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (const animatable of this.animatables) {
                animatable.draw(this.ctx, this.canvas.width, this.canvas.height);
            }
        }
    }
}