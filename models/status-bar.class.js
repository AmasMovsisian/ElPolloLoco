/**
 * Represents the character's health status bar UI element.
 * Displays remaining health and triggers death sequence when depleted.
 */
class StatusBar extends DrawableObject {
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];


  percent = 100;
  deathSequenceStarted = false;
  deathTimeout = null;


  /**
   * Initializes the status bar with full health.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 28;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercent(100);
  }


  /**
   * Starts the death sequence when health reaches zero.
   */
  startDeathSequence() {
    if (!gameRunning) return;
    this.deathSequenceStarted = true;
    this.deathTimeout = setTimeout(() => {
      if (gameRunning)this.gameLostCharacter();
    }, 1500);
  }


  /**
   * Updates the status bar image based on current health percentage.
   * @param {number} percent - Current health percentage (0-100).
   */
  setPercent(percent) {
    this.percent = percent;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCahche[path];
    if (this.percent === 0 && !this.deathSequenceStarted) {
      this.startDeathSequence();
    }
  }


  /**
   * Determines which status bar image to display based on health percentage.
   * @returns {number} Index of the appropriate image in IMAGES_HEALTH.
   */
  resolveImageIndex() {
    if (this.percent == 100) {
      return 5;
    } else if (this.percent >= 80) {
      return 4;
    } else if (this.percent >= 60) {
      return 3;
    } else if (this.percent >= 40) {
      return 2;
    } else if (this.percent >= 20) {
      return 1;
    } else {
      return 0;
    }
  }


  /**
   * Triggers the game lost sequence after a short delay.
   */
  gameLostCharacter() {
    lostGame();
    AudioHub.playOne(AudioHub.characterLost);
  }


}