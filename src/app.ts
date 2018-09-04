import { Animation } from "./animation";
import { Blade } from "./blade";

export class App {
    public run() {
        var animation = Animation.createInBody();
        var blade1 = new Blade();
        animation.animatables.push(blade1);
    }
}