type AnimationFunction = (ctx: CanvasRenderingContext2D, width?: number, height?: number) => void;
type UpdateFunction = (timeDiffMs: number) => void;

export interface Animatable {
    update: UpdateFunction;
    draw: AnimationFunction;
}

export class Animation {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private animations: AnimationFunction[] = [];
    private updates: UpdateFunction[] = [];


    public get width(): number {
        return this.canvas.width;
    }

    public get height(): number {
        return this.canvas.height;
    }


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

    public addAnimation = (func: AnimationFunction) => {
        this.animations.push(func);
    }

    public removeAnimation = (func: AnimationFunction) => {
        this.animations.splice(this.animations.indexOf(func), 1);
    }

    public addUpdate = (func: UpdateFunction) => {
        this.updates.push(func);
    }

    public removeUpdate = (func: UpdateFunction) => {
        this.updates.splice(this.updates.indexOf(func), 1);
    }

    public addAnimatable = (animatable: Animatable) => {
        this.updates.push(animatable.update);
        this.animations.push(animatable.draw);
    }

    public removeAnimatable = (animatable: Animatable) => {
        this.updates.splice(this.updates.indexOf(animatable.update), 1);
        this.animations.splice(this.animations.indexOf(animatable.draw), 1);
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

            for (const update of this.updates) {
                update(elapsed);
            }

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            for (const animate of this.animations) {
                animate(this.ctx, this.canvas.width, this.canvas.height);
            }
        }
    }
}