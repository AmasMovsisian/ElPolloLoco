/**
 * Represents the end boss health status bar UI element.
 * Displays the end boss's remaining health and triggers win sequence.
 */
class EndbossStatusBar extends DrawableObject {
  IMAGES_ENDBOSS_HEALTH = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];


  energy = 100;
  deathSequenceStarted = false;
  deathTimeout = null;


  /**
   * Initializes the end boss status bar with full health.
   */
  constructor() {
    super();
    this.loadImage("img/7_statusbars/2_statusbar_endboss/blue/blue100.png");
    this.loadImages(this.IMAGES_ENDBOSS_HEALTH);
    this.x = 450;
    this.y = 8;
    this.width = 200;
    this.height = 60;
    this.setPercent(100);
  }


  /**
   * Starts the death sequence when end boss health reaches zero.
   */
  startDeathSequence() {
    if (!gameRunning) return;
    this.deathSequenceStarted = true;
    this.deathTimeout = setTimeout(() => {
      if (gameRunning) {
        this.GameWon();
      }
    }, 1500);
  }


  /**
   * Updates the status bar image based on current energy level.
   * @param {number} energy - Current health of the end boss (0-100).
   */
  setPercent(energy) {
    this.energy = energy;
    let path = this.IMAGES_ENDBOSS_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCahche[path];
    if (this.energy === 0 && !this.deathSequenceStarted) {
      this.startDeathSequence();
    }
  }


  /**
   * Determines which status bar image to display based on energy percentage.
   * @returns {number} Index of the appropriate image in IMAGES_ENDBOSS_HEALTH.
   */
  resolveImageIndex() {
    if (this.energy == 100) {
      return 5;
    } else if (this.energy >= 80) {
      return 4;
    } else if (this.energy >= 60) {
      return 3;
    } else if (this.energy >= 40) {
      return 2;
    } else if (this.energy >= 20) {
      return 1;
    } else {
      return 0;
    }
  }


  /**
   * Triggers the game won sequence after a short delay.
   */
  GameWon() {
    if (this.energy == 0) {
      endGame();
    }
  }
}