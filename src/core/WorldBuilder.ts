import GameObject from "../objects/GameObject";
import GameObjectFactory from "../objects/GameObjectFactory";




class WorldBuilder {
    constructor(private factory: GameObjectFactory) {}

    buildWorld(config: any): GameObject[] {
        const gameObjects: GameObject[] = [];

        config.platforms.forEach((p: any) => {
            gameObjects.push(this.factory.createPlatform(p.x, p.y, p.width, p.height));
        });
        config.enemies.forEach((e: any) => {
            if (e.type === "mushroom") {
                gameObjects.push(this.factory.createMushroom(e.x, e.y, e.width, e.height, e.type));
            }
        });
        config.collectibles.forEach((c: any) => {
            gameObjects.push(this.factory.createCollectible(c.x, c.y, c.width, c.height));
        });

        return gameObjects;
    }
}


export default WorldBuilder;