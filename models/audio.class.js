class AudioHub {
  static characterWalking = new Audio("audio/character-walking-on-sand.mp3");
  static characterJump = new Audio("audio/character-jump.mp3");
  static characterHurt = new Audio("audio/character-hurt.mp3");
  static characterDied = new Audio("audio/character-died.mp3");
  static characterLost = new Audio("audio/character-lost.mp3");
  static characterWon = new Audio("audio/character-won.mp3");
  static characterSnoring = new Audio("audio/character-snoring.mp3");
  static bottleCollect = new Audio("audio/bottle-collect.mp3");
  static bottleHit = new Audio("audio/bottle-hit-break.mp3");
  static bottleThrow = new Audio("audio/bottle-throw.mp3");
  static coinCollect = new Audio("audio/coin-collect.mp3");
  static chickenHurt = new Audio("audio/chicken-hurt.mp3");
  static smallChickenHurt = new Audio("audio/small-chicken-hurt.mp3");
  static endBossHurt = new Audio("audio/endboss-hurt.mp3");
  static endBossAttack = new Audio("audio/endboss-attack.mp3");
  static endBossWalking = new Audio("audio/endboss-walking.mp3");
  static bgSound = new Audio("audio/BG-music.mp3");

  static allSounds = [
    AudioHub.characterWalking,
    AudioHub.characterJump,
    AudioHub.characterHurt,
    AudioHub.characterDied,
    AudioHub.characterLost,
    AudioHub.characterWon,
    AudioHub.characterSnoring,
    AudioHub.bottleCollect,
    AudioHub.bottleHit,
    AudioHub.bottleThrow,
    AudioHub.coinCollect,
    AudioHub.chickenHurt,
    AudioHub.smallChickenHurt,
    AudioHub.endBossHurt,
    AudioHub.endBossAttack,
    AudioHub.endBossWalking,
    AudioHub.bgSound,
  ];

  static stopAllSounds() {
  this.allSounds.forEach(s => (s.pause(), s.currentTime = 0));
  }

  static stopAllCharacterSounds() {
    const sounds = [
      this.characterWalking, this.characterJump, this.characterHurt,
      this.characterDied, this.characterSnoring, this.bottleCollect,
      this.bottleHit, this.bottleThrow, this.coinCollect, this.chickenHurt,
      this.smallChickenHurt, this.endBossHurt, this.endBossAttack,
      this.endBossWalking
    ];
    sounds.forEach(s => { s.pause(); s.currentTime = 0; });
  }


  static playOne(sound) {
    if (this.isMuted) return;
    sound.volume = this.savedVolume;
    sound.currentTime = 0;
    sound.play();
  }


  static stopOne(sound, instrumentId) {
    sound.pause();
    const instrumentImg = document.getElementById(instrumentId);
    if (instrumentImg) instrumentImg.classList.remove("active");
  }


  static playLoop(sound) {
    if (this.isMuted) return;
    sound.loop = true;
    if (sound.paused) {
      sound.volume = this.savedVolume;
      sound.play();
    }
  }


  static stop(sound) {
    sound.pause();
    sound.currentTime = 0;
  }

  
  static checkMuteStatus() {
    return this.isMuted;
  }


  static checkMuteStatus() {
    return this.isMuted;
  }


  static isMuted = localStorage.getItem("isMuted") === "true";
  static savedVolume = parseFloat(localStorage.getItem("volume")) || 0.2;


  static toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem("isMuted", this.isMuted);
    this.updateAllSounds();
    this.updateMuteButton();
    this.updateInstrumentImages();
    return this.isMuted;
  }


  static updateAllSounds() {
    const volume = this.isMuted ? 0 : this.savedVolume;
    AudioHub.allSounds.forEach((sound) => (sound.volume = volume));
  }


  static updateMuteButton() {
    const muteBtn = document.querySelector(".toggle-mute-btn");
    if (!muteBtn) return;
    muteBtn.textContent = this.isMuted ? "Sound ON" : "Sound OFF";
    muteBtn.classList.toggle("muted", !this.isMuted);
    muteBtn.classList.toggle("unmuted", this.isMuted);
  }


  static updateInstrumentImages() {
    document.querySelectorAll(".sound_img").forEach((img) => {
      if (this.isMuted) img.classList.remove("active");
    });
  }


  static applySavedSettings() {
    this.updateAllSounds();
    this.updateMuteButton();
  }
}


document.addEventListener("DOMContentLoaded", () => {
  AudioHub.applySavedSettings();
});
