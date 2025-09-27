class AudioManager {
  private backgroundMusic: HTMLAudioElement;

  constructor() {
    this.backgroundMusic = new Audio("public/assets/background.mp3");
    this.backgroundMusic.loop = true;
  }

  playBackgroundMusic() {
    if (!this.backgroundMusic) return;
    if (this.backgroundMusic.paused) {
      this.backgroundMusic.currentTime = 0;
      this.backgroundMusic.play();
    }
  }

  stopBackgroundMusic() {
    if (this.backgroundMusic && !this.backgroundMusic.paused) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }
}

export default AudioManager;
