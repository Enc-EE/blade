import { Controller } from "./controller";

export class GamepadControls implements Controller {
    public get xAxes(): number {
        var gamepads = navigator.getGamepads();
        var gp = gamepads[this.index];
        return gp.axes[0];
    }

    public get yAxes(): number {
        var gamepads = navigator.getGamepads();
        var gp = gamepads[this.index];
        return gp.axes[1];
    }

    public get start(): boolean {
        var gamepads = navigator.getGamepads();
        var gp = gamepads[this.index];
        return gp.buttons[9].pressed;
    }

    constructor(public name: string, private index: number) {
    }
}