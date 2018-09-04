import { Animation } from "./animation";
import { Blade } from "./blade";
import { KeyboardControls } from "./keyboardControls";
import { GamepadControls } from "./gamepadControls";

export class App {
    public run() {
        var animation = Animation.createInBody();
        var blade1 = new Blade(new KeyboardControls(37, 38, 39, 40), "black");
        animation.animatables.push(blade1);
        var blade2 = new Blade(new KeyboardControls(65, 87, 68, 83), "green");
        animation.animatables.push(blade2);

        var blade3 = new Blade(new GamepadControls(), "red");
        if (!navigator.getGamepads()[0]) {
            window.addEventListener("gamepadconnected", function (e) {
                animation.animatables.push(blade3);
            });
        } else {
            animation.animatables.push(blade3);
        }
    }
}