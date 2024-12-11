import Player from "../objects/Player";
import GameWorld from "./GameWorld";

class GameState {
    private player: Player;
    private gameWorld: GameWorld;
    private currentLevel: number;
    private isGameOver: boolean;

    constructor( config: any) {
        this.player = new Player(100, 100, 0, 0, 25, 40);
        this.gameWorld = new GameWorld();
        this.gameWorld.initializeWorld(config);
        this.currentLevel = 1;
        this.isGameOver = false;
    }

    getPlayer() {
        return this.player;
    }

    getGameWorld() {
        return this.gameWorld;
    }

    getCurrentLevel() {
        return this.currentLevel;
    }

    advanvceLevel() {
        this.currentLevel++;
    }
}

export default GameState;