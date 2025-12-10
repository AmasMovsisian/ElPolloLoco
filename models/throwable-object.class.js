/**
 * Represents a throwable bottle object that can be used as a weapon.
 * Features rotation animation and gravity-based projectile motion.
 */
class ThrowableObject extends Movableobject {
  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 50,
  };


  BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];


  /**
   * Creates a new throwable bottle at the specified position.
   * @param {number} x - Horizontal starting position.
   * @param {number} y - Vertical starting position.
   */
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.BOTTLE_ROTATION);
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 50;
    this.frame = 0;
    this.throw(100, 150);
  }


  /**
   * Initiates the throwing motion with sound, gravity, and rotation animation.
   */
  throw() {
    AudioHub.playOne(AudioHub.bottleThrow);
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
      this.frame = (this.frame + 1) % this.BOTTLE_ROTATION.length;
      this.loadImage(this.BOTTLE_ROTATION[this.frame]);
    }, 25);
  }


  /**
   * Plays the bottle rotation animation.
   */
  animate() {
    this.playAnimation(this.BOTTLE_ROTATION);
  }


}