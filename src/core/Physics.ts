import GameObject from "../objects/GameObject";
import Player from "../objects/Player";




class Physics {
    constructor() {
        console.log('Physics created');
    }

    applyPhysics( gameObjects: GameObject[] ) {
        gameObjects.forEach( (gameObject) => {
            gameObject.setX( gameObject.getX() + gameObject.getVx() );
            gameObject.setY( gameObject.getY() + gameObject.getVy() );
        });
    }
}


export default Physics;