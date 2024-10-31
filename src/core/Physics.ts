import GameObject from "../objects/GameObject";



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