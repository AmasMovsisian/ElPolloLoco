/**
 * Represents a background object in the game world.
 * Extends Movableobject to inherit basic movement and image loading capabilities.
 */
class BackgroundObject extends Movableobject {
  width = 720;
  height = 480;


  /**
   * Creates a new background object.
   * @param {string} imagePath - Path to the image file.
   * @param {number} x - Horizontal position on the canvas.
   * @param {number} y - Vertical position on the canvas (optional).
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}