import Collectible from "./Collectible";
import Mushroom from "./Mushroom";
import Platform from "./Platform";

class GameObjectFactory {

    // Factory method for creating a Platform
    createPlatform(x: number, y: number, width : number, height : number): Platform {
        const platform = new Platform(x, y, 0, 0, 200, 20); // Passing all 6 required arguments
        return platform;
    }

    // Factory method for creating a Mushroom
    createMushroom(x: number, y: number, width : number, height : number, type : string ): Mushroom {
        const mushroom = new Mushroom(x, y, 0, 0, width, height, type); // Passing all 7 required arguments
        return mushroom;
    }

    // Factory method for creating a Collectible (coin in this case)
    createCollectible(x: number, y: number, width: number, height : number ): Collectible {
        const collectible = new Collectible(x, y, 0, 0, width, height); // Collectible constructor with type
        return collectible;
    }
}

export default GameObjectFactory;
