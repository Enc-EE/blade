import { Animation } from "./enc/animation";
import { MenuView } from "./menuView";
import { GameView } from "./gameView";


export class App {
    animation: Animation;
    menu: MenuView;
    game: GameView;

    public run() {
        this.animation = Animation.createInBody();
        this.menu = new MenuView(this.start);
        this.game = new GameView();
        this.animation.addView(this.menu);
        this.animation.addView(this.game);
        this.game.hide();
    }

    private start = () => {
        this.menu.hide();
        this.menu.unload();
        this.game.show();
        this.game.start(this.menu.controllers);
    }
}