import GameObject from "../objects/GameObject";
import Player from "../objects/Player";
import WorldBuilder from "./WorldBuilder";

export enum GameStatus {
    ACTIVE,
    PAUSED,
    WON,
    LOST,
    COMPLETE
}

class GameState {
    private player: Player;
    private currentLevel: number;
    private status: GameStatus;
    private winPosition: number;
    private gameObjects: GameObject[] = [];
    private builder: WorldBuilder;
    private config: any;
    
    isLastLevel(): boolean {
        return this.currentLevel >= this.config.levels.length - 1; // ✅ Check if last level is reached
    }
    
    constructor(config: any) {
        this.player = new Player(100, 100, 0, 0, 25, 40, this);
        this.currentLevel = 1;
        this.status = GameStatus.ACTIVE;
        this.builder = new WorldBuilder();
        this.config = config;
        this.winPosition = this.builder.getWinPosition(config, this.currentLevel);
        this.gameObjects = this.builder.buildWorld(config, this.currentLevel);
    }

    setStatus(status: GameStatus) {
        this.status = status;
    }

    getWinPosition() {
        return this.winPosition;
    }

    getStatus() {
        return this.status;
    }

    isGameOver() {
        return this.status === GameStatus.LOST;
    }

    isPaused() {
        return this.status === GameStatus.PAUSED || this.status === GameStatus.LOST || this.status === GameStatus.WON;
    }

    loseLevel() {
        this.status = GameStatus.LOST;
    }

    winLevel() {
        if (this.currentLevel === this.config.levels.length ) {
            // 🏆 Player completed the last level
            this.setStatus(GameStatus.COMPLETE);  // New status for last level
        } else {
            // ✅ Player won this level, move to next
            this.status = GameStatus.WON;
        }
    }

    gameCompleted() {
        this.status = GameStatus.COMPLETE;
    }


    restartGame() {
        this.currentLevel = 1;
        this.status = GameStatus.ACTIVE;
        this.gameObjects = this.builder.buildWorld(this.config, this.currentLevel);
    }

    advanceLevel() {
        if (this.status === GameStatus.WON) {
            this.currentLevel++;
            this.status = GameStatus.ACTIVE;
            this.player = new Player(100, 100, 0, 0, 25, 40, this);
            this.winPosition = this.builder.getWinPosition(this.config, this.currentLevel);
            this.gameObjects = this.builder.buildWorld(this.config, this.currentLevel);
        }
    }

    getPlayer() {
        return this.player;
    }

    getObjects() {
        return this.gameObjects;
    }
}


export default GameState;