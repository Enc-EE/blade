import { Controller } from "./controller";

export class KeyboardControls implements Controller {
    public xAxes: number;
    public yAxes: number;

    constructor(public name: string, leftKey: number, upKey: number, rightKey: number, downKey: number) {
        this.xAxes = 0;
        this.yAxes = 0;

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
        });
    }
}