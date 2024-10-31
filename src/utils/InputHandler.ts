



class InputHandler {
    private keys: { [key: string]: boolean } = {};

    constructor() {
        window.addEventListener('keydown', (event) => this.keyDownHandler(event));
        window.addEventListener('keyup', (event) => this.keyUpHandler(event));
    }

    private keyDownHandler(event: KeyboardEvent) {
        this.keys[event.key] = true;
    }

    private keyUpHandler(event: KeyboardEvent) {
        this.keys[event.key] = false;
    }

    public isKeyPressed(key: string): boolean {
        return this.keys[key] || false;
    }

    public resetKeys() {
        this.keys = {};
    }

}


export default InputHandler;