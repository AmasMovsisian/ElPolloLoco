/**
 * Central audio management hub for handling all game sounds.
 * Provides static methods for playing, stopping, and controlling audio.
 */
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

  static allGameSounds = [
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
  ];


  /**
   * Stops all game sounds and resets their playback position.
   */
  static stopAllSounds() {
    this.allGameSounds.forEach(s => (s.pause(), s.currentTime = 0));
  }


  /**
   * Stops all character-related sounds and sound effects.
   */
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


  /**
   * Plays a single sound effect once from the beginning.
   * @param {HTMLAudioElement} sound - The audio element to play.
   */
  static playOne(sound) {
    if (this.isMuted) return;
    sound.volume = this.savedVolume;
    sound.currentTime = 0;
    sound.play();
  }


  /**
   * Stops a specific sound and deactivates its visual indicator.
   * @param {HTMLAudioElement} sound - The audio element to stop.
   * @param {string} instrumentId - ID of the associated instrument image element.
   */
  static stopOne(sound, instrumentId) {
    sound.pause();
    const instrumentImg = document.getElementById(instrumentId);
    if (instrumentImg) instrumentImg.classList.remove("active");
  }


  /**
   * Plays a sound in a continuous loop.
   * @param {HTMLAudioElement} sound - The audio element to loop.
   */
  static playLoop(sound) {
    if (this.isMuted) return;
    sound.loop = true;
    if (sound.paused) {
      sound.volume = this.savedVolume;
      sound.play();
    }
  }


  /**
   * Stops and resets a specific sound.
   * @param {HTMLAudioElement} sound - The audio element to stop.
   */
  static stop(sound) {
    sound.pause();
    sound.currentTime = 0;
  }


  static isMuted = localStorage.getItem("isMuted") === "true";
  static savedVolume = parseFloat(localStorage.getItem("volume")) || 0.2;
  static isBgMuted = localStorage.getItem("isBgMuted") === "true";


  /**
   * Toggles mute state for all sounds.
   * @returns {boolean} The new mute state.
   */
  static toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem("isMuted", this.isMuted);
    this.updateAllSounds();
    this.updateMuteButton();
    this.updateInstrumentImages();
    return this.isMuted;
  }


  /**
   * Toggles mute state for background sound only.
   * @returns {boolean} The new background mute state.
   */
  static toggleMuteBG() {
    this.isBgMuted = !this.isBgMuted;
    localStorage.setItem("isBgMuted", this.isBgMuted);
    this.updateBgSound();
    this.updateBgMuteButton();
    return this.isBgMuted;
  }


  /**
   * Updates volume for all sounds based on current mute state.
   */
  static updateAllSounds() {
    const volume = this.isMuted ? 0 : this.savedVolume;
    AudioHub.allGameSounds.forEach((sound) => (sound.volume = volume));
  }


  /**
   * Updates background sound based on current background mute state.
   */
  static updateBgSound() {
    const volume = this.isBgMuted ? 0 : this.savedVolume;
    AudioHub.bgSound.volume = volume;
    
    if (!this.isBgMuted && AudioHub.bgSound.paused) {
      AudioHub.bgSound.loop = true;
      AudioHub.bgSound.play();
    } else if (this.isBgMuted) {
      AudioHub.bgSound.pause();
    }
  }


  /**
   * Updates the mute button text and visual state.
   */
  static updateMuteButton() {
    const muteBtn = document.querySelector(".toggle-mute-btn");
    if (!muteBtn) return;
    muteBtn.textContent = this.isMuted ? "Sound ON" : "Sound OFF";
    muteBtn.classList.toggle("muted", !this.isMuted);
    muteBtn.classList.toggle("unmuted", this.isMuted);
  }


  /**
   * Updates the background mute button text and visual state.
   */
  static updateBgMuteButton() {
    const bgMuteBtn = document.querySelector(".toggle-mute-btn-BG");
    if (!bgMuteBtn) return;
    bgMuteBtn.textContent = this.isBgMuted ? "BG Sound ON" : "BG Sound OFF";
    bgMuteBtn.classList.toggle("muted", !this.isBgMuted);
    bgMuteBtn.classList.toggle("unmuted", this.isBgMuted);
  }


  /**
   * Deactivates all instrument sound images when muted.
   */
  static updateInstrumentImages() {
    document.querySelectorAll(".sound_img").forEach((img) => {
      if (this.isMuted) img.classList.remove("active");
    });
  }


  /**
   * Applies saved volume and mute settings from localStorage.
   */
  static applySavedSettings() {
    this.updateAllSounds();
    this.updateBgSound();
    this.updateMuteButton();
    this.updateBgMuteButton();
  }
}


document.addEventListener("DOMContentLoaded", () => {
  AudioHub.applySavedSettings();
});