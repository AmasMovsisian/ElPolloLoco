/**
 * Represents a small chicken enemy in the game.
 * Can be killed by jumping on it or by throwing bottles.
 */
class SmallChicken extends Movableobject {
  height = 50;
  width = 50;
  y = 380;
  isDead = false;
  isHitFromTop = false;
  isHitFromBottle = false;
  offset = {
    top: 5,
    bottom: 5,
    left: 13,
    right: 13,
  };


  IMAGE_DEAD_SMALL_CHICKEN = [
    "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ];


  IMAGES_WALKING_SMALL_CHICKEN = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];


  BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];


  /**
   * Creates a new small chicken with random position and speed.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING_SMALL_CHICKEN[0]);
    this.loadImages(this.IMAGES_WALKING_SMALL_CHICKEN);
    this.x = 850 + Math.random() * 9050;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }


  /**
   * Starts animation and movement intervals for the small chicken.
   */
  animate() {
    setInterval(() => {
      if (!this.isDead) this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING_SMALL_CHICKEN);
      } else if (this.isHitFromBottle) {
      } else {
        this.loadImage(this.IMAGE_DEAD_SMALL_CHICKEN[0]);
      }
    }, 100);
  }


  /**
   * Plays bottle splash animation and marks chicken for removal.
   */
  splash() {
    this.isDead = true;
    this.isHitFromBottle = true;
    this.frame = 0;
    this.splashInterval = setInterval(() => {
      if (this.frame < this.BOTTLE_SPLASH.length) {
        AudioHub.playOne(AudioHub.smallChickenHurt);
        this.loadImage(this.BOTTLE_SPLASH[this.frame]);
        this.frame++;
      } else {
        clearInterval(this.splashInterval);
        this.toRemove = true;
      }
    }, 50);
  }
}