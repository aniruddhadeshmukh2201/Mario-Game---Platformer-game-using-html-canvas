
import GameObject from "../objects/GameObject";
import GameObjectFactory from "../objects/GameObjectFactory";

class WorldBuilder {
    factory: GameObjectFactory;
    
    constructor() {
        this.factory = new GameObjectFactory();
    }

    buildWorld(config: any, levelId : number): GameObject[] {
        const gameObjects: GameObject[] = [];
        config.levels.forEach((level: any) => {
            if(level.id == levelId) {
                level.platforms.forEach((p: any) => {
                    gameObjects.push(this.factory.createPlatform(p.x, p.y, p.width, p.height));
                });
                level.enemies.forEach((e: any) => {
                    if (e.type === "mushroom") {
                        gameObjects.push(this.factory.createMushroom(e.x, e.y, e.width, e.height, e.vx, e.vy, e.type));
                    }
                });
                level.collectibles.forEach((c: any) => {
                    gameObjects.push(this.factory.createCollectible(c.x, c.y, c.width, c.height));
                });
            }
        });

        return gameObjects;
    }

    getWinPosition(config: any, levelId: number): number {
        let winPosition = 0;
        config.levels.forEach((level: any) => {
            if(level.id === levelId) {
                winPosition = level.winPosition;
            }
        });
        return winPosition;
    }
}


export default WorldBuilder;