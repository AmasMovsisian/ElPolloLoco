class AudioHub {
  static characterWalking = new Audio("audio/character-walking-on-sand.mp3");
  static characterJump = new Audio("audio/character-jump.mp3");
  static characterHurt = new Audio("audio/character-hurt.mp3");
  static characterDied = new Audio("audio/character-died.mp3");
  static characterLost = new Audio("audio/character-lost.mp3");
  static characterWon = new Audio("audio/character-won.mp3");

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


  static isMuted = false;
  static savedVolume = 0.2;

  static playOne(sound) {
    if (this.isMuted) {
      return;
    }
    sound.volume = this.savedVolume;
    sound.currentTime = 0;
    sound.play();
  }

  static toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      AudioHub.allSounds.forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
        sound.volume = 0;
      });

      const muteBtn = document.querySelector(".toggle-mute-btn");
      if (muteBtn) {
        muteBtn.textContent = "Sound ON";
        muteBtn.classList.remove("muted");
        muteBtn.classList.add("unmuted");
      }
    } else {
      AudioHub.allSounds.forEach((sound) => {
        sound.volume = this.savedVolume;
      });

      const muteBtn = document.querySelector(".toggle-mute-btn");
      if (muteBtn) {
        muteBtn.textContent = "Sound OFF";
        muteBtn.classList.remove("unmuted");
        muteBtn.classList.add("muted");
      }
    }

    const volumeElement = document.getElementById("volume");
    if (volumeElement) {
      volumeElement.value = this.isMuted ? 0 : this.savedVolume;
    }

    const instrumentImages = document.querySelectorAll(".sound_img");
    if (instrumentImages.length > 0) {
      instrumentImages.forEach((img) => {
        if (this.isMuted) {
          img.classList.remove("active");
        }
      });
    }

    return this.isMuted;
  }

  static stopOne(sound, instrumentId) {
    sound.pause();
    const instrumentImg = document.getElementById(instrumentId);
    if (instrumentImg) {
      instrumentImg.classList.remove("active");
    }
  }

  static objSetVolume(volumeSliderID) {
    let currentVolumeValue = document.getElementById(volumeSliderID).value;
    this.savedVolume = currentVolumeValue;

    if (!this.isMuted) {
      AudioHub.allSounds.forEach((sound) => {
        sound.volume = currentVolumeValue;
      });
    }
  }

  static playLoop(sound) {
    if (this.isMuted) {
      return;
    }
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
}
