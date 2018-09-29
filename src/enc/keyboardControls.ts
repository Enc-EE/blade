import { Controller } from "./controller";

export class KeyboardControls implements Controller {
    public a: boolean;
    public xAxes: number;
    public yAxes: number;

    public start: boolean;

    constructor(public name: string, upKey: number, leftKey: number, downKey: number, rightKey: number, a: number) {
        this.xAxes = 0;
        this.yAxes = 0;
        this.start = false;

        document.addEventListener('keydown', (event) => {
            if (event.keyCode == leftKey) {
                this.xAxes = -1
            }
            if (event.keyCode == upKey) {
                this.yAxes = -1;
            }
            if (event.keyCode == rightKey) {
                this.xAxes = 1;
            }
            if (event.keyCode == downKey) {
                this.yAxes = 1;
            }
            if (event.keyCode == 13) {
                this.start = true;
            }
            if (event.keyCode == a) {
                this.a = true;
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.keyCode == leftKey) {
                if (this.xAxes = -1) {
                    this.xAxes = 0;
                }
            }
            if (event.keyCode == upKey) {
                if (this.yAxes = -1) {
                    this.yAxes = 0;
                }
            }
            if (event.keyCode == rightKey) {
                if (this.xAxes = 1) {
                    this.xAxes = 0;
                }
            }
            if (event.keyCode == downKey) {
                if (this.yAxes = 1) {
                    this.yAxes = 0;
                }
            }
            if (event.keyCode == 13) {
                this.start = false;
            }
            if (event.keyCode == a) {
                this.a = false;
            }
        });
    }
}