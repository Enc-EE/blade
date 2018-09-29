import { Controller } from "./enc/controller";
import { View } from "./enc/view";
import { Blade } from "./blade";
import { Collider } from "./collider";

export class GameView extends View {

    private started = false;

    private blades: Blade[] = [];
    public start(controllers: Controller[]) {
        if (this.started) {
            return;
        }
        this.started = true;

        console.log(controllers);

        for (let i = 0; i < controllers.length; i++) {
            const controller = controllers[i];
            var blade = new Blade(controller);
            let startX = 0;
            let startY = 0;
            switch (i + 1) {
                case 1:
                    startX = this.width / 3;
                    startY = this.height / 3;
                    break;
                case 2:
                    startX = this.width / 3 * 2;
                    startY = this.height / 3;
                    break;
                case 3:
                    startX = this.width / 3;
                    startY = this.height / 3 * 2;
                    break;
                case 4:
                    startX = this.width / 3 * 2;
                    startY = this.height / 3 * 2;
                    break;
            }
            blade.bladeNumber = i + 1;
            blade.x = startX;
            blade.y = startY;
            this.blades.push(blade);
            this.addAnimatable(blade);
        }
        this.addAnimatable(new Collider(this.blades, this.width, this.height));
    }
}