import { Animation } from "./animation";
import { Blade } from "./blade";
import { KeyboardControls } from "./keyboardControls";
import { GamepadControls } from "./gamepadControls";
import { MenuBlade } from "./menuBlade";

var haveEvents = 'ongamepadconnected' in window;

export class App {
    private isPlayerSelection: boolean = true;
    private controllerNames: string[] = [];
    animation: Animation;
    controllers: any = [];

    public run() {
        this.animation = Animation.createInBody();

        // var blade3 = new Blade(new GamepadControls(), "red");
        // if (!navigator.getGamepads()[0]) {
        //     window.addEventListener("gamepadconnected", function (e) {
        //         animation.addAnimatable(blade3);
        //     });
        // } else {
        //     animation.addAnimatable(blade3);
        // }

        if (this.isPlayerSelection) {
            this.animation.addAnimation((ctx, width, height) => {
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.font = "22px sans-serif";
                ctx.fillText("You can control a blade with a gamepad, the arrow keys or WASD.", width / 2, 50);
                ctx.fillText("Press up to join and down to leave.", width / 2, 80);
                ctx.fillText("Press enter on keyboard or start on a controller to start.", width / 2, 110);
            });

            var blade1 = new MenuBlade(new KeyboardControls("arrows", 37, 38, 39, 40), this.addController, this.removeController);
            this.animation.addAnimatable(blade1);
            var blade2 = new MenuBlade(new KeyboardControls("wasd", 65, 87, 68, 83), this.addController, this.removeController);
            this.animation.addAnimatable(blade2);

        }
        window.addEventListener("gamepadconnected", this.connecthandler);
        window.addEventListener("gamepaddisconnected", this.disconnecthandler);

        if (!haveEvents) {
            setInterval(this.scangamepads, 500);
        }

    }

    private addController = (menuBlade: MenuBlade) => {
        console.log("added controller " + menuBlade.controllerName);

        if (this.controllerNames.length <= 4) {
            this.controllerNames.push(menuBlade.controllerName);
            let color = "black";
            let startX = 0;
            let startY = 0;
            switch (this.controllerNames.length) {
                case 1:
                    color = "red";
                    startX = this.animation.width / 3;
                    startY = (this.animation.height - 100) / 3 + 100;
                    break;
                case 2:
                    color = "green";
                    startX = this.animation.width / 3 * 2;
                    startY = (this.animation.height - 100) / 3 + 100;
                    break;
                case 3:
                    color = "blue";
                    startX = this.animation.width / 3;
                    startY = (this.animation.height - 100) / 3 * 2 + 100;
                    break;
                case 4:
                    color = "orange";
                    startX = this.animation.width / 3 * 2;
                    startY = (this.animation.height - 100) / 3 * 2 + 100;
                    break;
            }
            menuBlade.color = color;
            menuBlade.x = startX;
            menuBlade.y = startY;
        } else {
            console.log("Sorry, only 4 controllers supported");
        }
    }

    private removeController = (menuBlade: MenuBlade) => {
        console.log("removed controller " + menuBlade.controllerName);

        this.controllerNames.splice(this.controllerNames.indexOf(menuBlade.controllerName), 1);
    }

    connecthandler = (e: GamepadEvent) => {
        this.addgamepad(e.gamepad);
    }

    scangamepads = () => {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        for (var i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
                if (gamepads[i].index in this.controllers) {
                    this.controllers[gamepads[i].index] = gamepads[i];
                } else {
                    this.addgamepad(gamepads[i]);
                }
            }
        }
    }

    disconnecthandler = (e: GamepadEvent) => {
        this.removegamepad(e.gamepad);
    }

    removegamepad = (gamepad: Gamepad) => {
        delete this.controllers[gamepad.index];
    }

    addgamepad = (gamepad: Gamepad) => {
        var blade = new MenuBlade(new GamepadControls(gamepad.index.toString(), gamepad.index), this.addController, this.removeController);
        this.animation.addAnimatable(blade);
        this.controllers[gamepad.index] = gamepad;
    }
}