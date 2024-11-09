import GameObject from "../objects/GameObject";
import WorldBuilder from "./WorldBuilder";

class GameWorld {
    private gameObjects: GameObject[] = [];

    constructor(private builder: WorldBuilder) {}

    async initializeWorld(config : any) {
        console.log("----config------", config);
        this.gameObjects = this.builder.buildWorld(config);
        console.log("----gameObjects------", this.gameObjects);
    }

    getObjects(): GameObject[] {
        return this.gameObjects;
    }
}


export default GameWorld;