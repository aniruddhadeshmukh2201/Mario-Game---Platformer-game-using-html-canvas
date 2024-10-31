import Game from "./core/Game";
import GameLoop from "./core/GameLoop";


const game = new Game(); 
const gameLoop = new GameLoop(game);
gameLoop.start();