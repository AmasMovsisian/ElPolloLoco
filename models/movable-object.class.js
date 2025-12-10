/**
 * Base class for all movable game objects.
 * Extends DrawableObject with physics, collision, and movement capabilities.
 */
class Movableobject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedy = 0;
  acceleration = 2.5;
  energy = 100;
  coinCrowd = 0;
  lasthit = 0;
  isGameOver = false;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };


  /**
   * Triggers game over sequence, stopping animations and ending the game.
   */
  gameOver() {
    this.isGameOver = true;
    if (this.character && this.character.stopAnimations) {
      this.character.stopAnimations();
    }
    if (this.level && this.level.endboss) {
      this.level.endboss.forEach(boss => {
        if (boss.stopAnimations) boss.stopAnimations();
      });
    }
    endGame();
  }


  /**
   * Applies gravity physics to the object.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedy > 0) {
        this.y -= this.speedy;
        this.speedy -= this.acceleration;
      }
    }, 1000 / 25);
  }


  /**
   * Checks if the object is above ground level.
   * @returns {boolean} True if object is above ground or is a throwable object.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 135;
    }
  }


  /**
   * Checks collision between this object and another movable object.
   * @param {Movableobject} mo - The other object to check collision with.
   * @returns {boolean} True if objects are colliding, considering offset.
   */
 isColliding(mo) {
  return (
    this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
    this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
    this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
    this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
  );
}


  /**
   * Checks if this object is colliding with another object from the top.
   * @param {Movableobject} mo - The other object to check collision with.
   * @returns {boolean} True if collision is from the top.
   */
  isCollidingTop(mo) {
    if (!this.isColliding(mo)) return false;
    const bottomA = this.y + this.height - this.offset.bottom;
    const topA = this.y + this.offset.top;
    const leftA = this.x + this.offset.left;
    const rightA = this.x + this.width - this.offset.right;
    const topB = mo.y + mo.offset.top;
    const leftB = mo.x + mo.offset.left;
    const rightB = mo.x + mo.width - mo.offset.right;
    const horizontallyCentered = rightA > leftB && leftA < rightB;
    if (!horizontallyCentered) return false;
    const isAbove = bottomA <= topB + 10;
    if (!isAbove) return false;
    return true;
  }


  /**
   * Reduces object's energy when hit and updates last hit time.
   */
  hit() {
    this.energy -= 1;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lasthit = new Date().getTime();
    }
  }


  /**
   * Checks if object is currently in a hurt state.
   * @returns {boolean} True if object was recently hit.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lasthit;
    timepassed = timepassed / 500;
    return timepassed < 0.5;
  }


  /**
   * Checks if object's energy is depleted.
   * @returns {boolean} True if energy is zero.
   */
  isDead() {
    return this.energy == 0;
  }


  /**
   * Moves object to the right based on its speed.
   */
  moveRight() {
    this.x += this.speed;
  }


  /**
   * Moves object to the left based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }


  /**
   * Plays an animation sequence by cycling through images.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCahche[path];
    this.currentImage++;
  }


  /**
   * Plays an animation sequence once without looping.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playOnceAnimation(images) {
    if (this.currentImageDead < images.length) {
      let path = images[this.currentImageDead];
      this.img = this.imageCahche[path];
      this.currentImageDead++;
    }
  }


  /**
   * Makes the object jump by applying upward velocity.
   */
  jump() {
    this.speedy = 30;
  }


  /**
   * Marks an enemy as dead when hit.
   */
  enemyWasHit() {
    this.isDead = true;
  }
}