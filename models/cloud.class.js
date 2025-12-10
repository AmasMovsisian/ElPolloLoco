/**
 * Represents a cloud object in the background.
 * Moves slowly to create parallax scrolling effect.
 */
class Cloud extends Movableobject {
  y = 10;
  width = 500;
  height = 250;


  /**
   * Creates a new cloud with random position.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * (11000 - 200) + 200;
    this.y = Math.random() * (70 - 10) + 10;
    this.animate();
  }


  /**
   * Starts the cloud's movement animation.
   */
  animate() {
    this.moveLeft();
  }


  /**
   * Moves the cloud continuously to the left.
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 120);
  }
}