/**
 * Represents a collectible coin object.
 * Features an animated spinning effect and random placement.
 */
class Coin extends Movableobject {
  height = 120;
  width = 120;
  y = 100;
  x = 100;
  offset = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  };


  COIN_IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];


  /**
   * Creates a new coin with random position and starts animation.
   */
  constructor() {
    super();
    this.loadImage(this.COIN_IMAGES[0]);
    this.loadImages(this.COIN_IMAGES);
    this.x = 800 + Math.random() * 9000;
    this.y = 100 + Math.random() * 60;
    this.startCoinAnimation();
  }


  /**
   * Starts the coin's spinning animation by toggling between two images.
   */
  startCoinAnimation() {
    let toggle = false;
    setInterval(() => {
      if (toggle) {
        this.loadImage(this.COIN_IMAGES[0]);
        this.width = this.height = 120;
      } else {
        this.loadImage(this.COIN_IMAGES[1]);
        this.width = this.height = 123;
      }
      toggle = !toggle;
    }, 400);
  }
}