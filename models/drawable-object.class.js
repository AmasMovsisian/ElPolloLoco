/**
 * Base class for all drawable objects in the game.
 * Provides common functionality for image loading, caching, and drawing.
 */
class DrawableObject {
  x = 120;
  y = 280;
  img;
  width = 100;
  height = 150;
  imageCahche = {};
  currentImage = 0;
  currentImageDead = 0;
  percentOfBottles = 0;
  

  /**
   * Loads a single image from the given path.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }


  /**
   * Draws the object onto the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  /**
   * Draws a debug frame around certain object types (currently disabled).
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof SmallChicken ||
      this instanceof Endboss ||
      this instanceof Coin ||
      this instanceof ThrowableObject ||
      this instanceof Bottles
    ) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      // ctx.strokeStyle = 'blue';
      // ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
      // ctx.stroke();
    }
  }


  /**
   * Preloads multiple images and caches them for later use.
   * @param {string[]} arr - Array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCahche[path] = img;
    });
  }
}