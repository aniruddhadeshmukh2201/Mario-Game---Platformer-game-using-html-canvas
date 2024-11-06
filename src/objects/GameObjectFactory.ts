import Collectible from "./Collectible";
import GameObject from "./GameObject";
import Mushroom from "./Mushroom";
import Platform from "./Platform";

class GameObjectFactory {
    private prototypes = {
        platform: new GameObject(0, 0, 200, 20),
        mushroom: new GameObject(0, 0),
        coin: new GameObject(0, 0, CollectibleType.COIN),
    };

    createPlatform(x: number, y: number): GameObject {
        const platform = Object.assign(Object.create(Object.getPrototypeOf(this.prototypes.platform)), this.prototypes.platform);
        platform.setPosition(x, y);
        return platform;
    }

    createMushroom(x: number, y: number): GameObject {
        const mushroom = Object.assign(Object.create(Object.getPrototypeOf(this.prototypes.mushroom)), this.prototypes.mushroom);
        mushroom.setPosition(x, y);
        return mushroom;
    }

    createCollectible(x: number, y: number, type: string): GameObject {
        const collectible = Object.assign(Object.create(Object.getPrototypeOf(this.prototypes.coin)), this.prototypes.coin);
        collectible.setPosition(x, y);
        return collectible;
    }
}


export default GameObjectFactory;