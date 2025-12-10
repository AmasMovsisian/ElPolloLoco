class Bottles extends Movableobject {
  width = 60;
  height = 60;
  offset = {
    top: 8,
    bottom: 5,
    left: 23,
    right: 20,
  };


  IMAGES_BOTTLES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];


  constructor() {
    super();
    const randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLES.length);
    const randomImage = this.IMAGES_BOTTLES[randomIndex];
    this.loadImage(randomImage);
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = 800 + Math.random() * 4200;
    this.y = 360;
  }
}
