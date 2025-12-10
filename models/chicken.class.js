class Chicken extends Movableobject {
  height = 72;
  width = 72;
  y = 360;
  isDead = false;
  isHitFromTop = false;
  isHitFromBottle = false;
  offset = {
    top: 0,
    bottom: 15,
    left: 10,
    right: 10,
  };


  IMAGES_WALKING_CHICKEN = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];


  IMAGE_DEAD_CHICKEN = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];


  BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];


  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 850 + Math.random() * 9000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.loadImages(this.IMAGES_WALKING_CHICKEN);
    this.animate();
    this.moveLeft();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead) this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING_CHICKEN);
      } else if (this.isHitFromBottle) {
      } else {
        this.loadImage(this.IMAGE_DEAD_CHICKEN[0]);
      }
    }, 100);
  }


  splash() {
    this.isDead = true;
    this.isHitFromBottle = true;
    this.frame = 0;
    this.splashInterval = setInterval(() => {
      if (this.frame < this.BOTTLE_SPLASH.length) {
        AudioHub.playOne(AudioHub.chickenHurt);
        this.loadImage(this.BOTTLE_SPLASH[this.frame]);
        this.frame++;
      } else {
        clearInterval(this.splashInterval);
        this.toRemove = true;
      }
    }, 50);
  }
}
