import { Controller } from "./controller";
import { View } from "./view";
import { Blade } from "./blade";
import { Collider } from "./collider";

export class GameView extends View {

    private blades: Blade[] = [];
    public start(controllers: Controller[]) {
        for (let i = 0; i < controllers.length; i++) {
            const controller = controllers[i];
            var blade = new Blade(controller);
            let color = "black";
            let startX = 0;
            let startY = 0;
            switch (i + 1) {
                case 1:
                    color = "red";
                    startX = this.width / 3;
                    startY = this.height / 3;
                    break;
                case 2:
                    color = "green";
                    startX = this.width / 3 * 2;
                    startY = this.height / 3;
                    break;
                case 3:
                    color = "blue";
                    startX = this.width / 3;
                    startY = this.height / 3 * 2;
                    break;
                case 4:
                    color = "orange";
                    startX = this.width / 3 * 2;
                    startY = this.height / 3 * 2;
                    break;
            }
            blade.color = color;
            blade.x = startX;
            blade.y = startY;
            this.blades.push(blade);
            this.addAnimatable(blade);
        }
        this.addAnimatable(new Collider(this.blades, this.width, this.height));
    }
}