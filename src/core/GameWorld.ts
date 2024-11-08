import GameObject from "../objects/GameObject";
import WorldBuilder from "./WorldBuilder";




class GameWorld {
    private gameObjects: GameObject[] = [];

    constructor(private builder: WorldBuilder) {}

    async initializeWorld(configUrl: string) {
        const response = await fetch(configUrl);
        const config = await response.json();
        this.gameObjects = this.builder.buildWorld(config);
    }

    getObjects(): GameObject[] {
        return this.gameObjects;
    }
}


export default GameWorld;