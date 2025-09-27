# Mario Platformer Game

A classic Mario-style platformer built with HTML5 Canvas and TypeScript. Jump, run, and collect coins as you avoid enemies and navigate through creative levels inspired by Super Mario Bros.

## Features
- Responsive canvas: fills the screen width, configurable height
- Multiple levels with valleys, gaps, and creative platform layouts
- Player and mushroom enemies with physics (gravity, collisions)
- Collectibles (coins, gems, power-ups)
- Game overlays: start screen, game over, level complete
- Background music (Super Mario Bros theme)
- Clean, modern UI overlays

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Vite](https://vitejs.dev/) (for development/build)

### Installation
1. Clone the repository:
   ```powershell
   git clone https://github.com/yourusername/mario-game.git
   cd mario-game
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173` (or the port shown in your terminal).

## Project Structure
```
├── src/
│   ├── assets/           # Level configs, music
│   ├── core/             # Game logic (Game.ts, AudioManager.ts, etc.)
│   ├── objects/          # Game objects (Player, Mushroom, Platform, etc.)
│   ├── physics/          # Physics engine
│   ├── render/           # Renderer for overlays and game objects
│   ├── style.css         # Game styles
│   ├── index.html        # Main HTML file
│   └── index.ts          # Entry point
├── public/assets/        # Audio files (SuperMarioBros.mp3, etc.)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Customization
- **Levels:** Edit `src/assets/config.json` to add or modify levels, platforms, enemies, and collectibles.
- **Music:** Replace `public/assets/SuperMarioBros.mp3` with your own music if desired.
- **Canvas Height:** Change `canvasHeight` in `config.json` for different screen sizes.

## Credits
- Mario theme music: [Nintendo](https://www.nintendo.com/) (for educational/demo use only)
- Game inspired by Super Mario Bros

## License
MIT License

---
Enjoy jumping and running in your own Mario world!
