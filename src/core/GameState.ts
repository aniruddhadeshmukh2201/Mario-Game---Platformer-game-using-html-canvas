import Player from "../objects/Player";
import GameWorld from "./GameWorld";

class GameState {
    private player: Player;
    private gameWorld: GameWorld;
    constructor( config: any) {
        this.player = new Player(100, 100, 0, 0, 25, 40);
        this.gameWorld = new GameWorld();
        this.gameWorld.initializeWorld(config);
    }

    getPlayer() {
        return this.player;
    }

    getGameWorld() {
        return this.gameWorld;
    }
}

export default GameState;