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

  constructor() {
    super();
    this.loadImage("img/7_statusbars/2_statusbar_endboss/blue/blue100.png");
    this.loadImages(this.IMAGES_ENDBOSS_HEALTH);
    this.x = 480;
    this.y = 8;
    this.width = 200;
    this.height = 60;
    this.setPercent(100);
  }

  setPercent(energy) {
        this.energy = energy;
        let path = this.IMAGES_ENDBOSS_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCahche[path];
    }

    resolveImageIndex() {
        if (this.energy == 100) {
            return 5;
        } else if (this.energy >= 80) {
            return 4;
        }
        else if (this.energy >= 60) {
            return 3;
        }
        else if (this.energy >= 40) {
            return 2;
        }
        else if (this.energy >= 20) {
            return 1;
        } else {
            return 0;
        }

  
}

}