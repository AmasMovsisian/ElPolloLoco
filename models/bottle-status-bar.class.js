class BottleStatusBar extends DrawableObject {

  BOTTLESTATUSBAR_IMAGES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
  ];

  percent = 0;

  constructor() {
    super();
    this.loadImages(this.BOTTLESTATUSBAR_IMAGES);
    this.x = 28;
    this.y = 100;
    this.width = 200;
    this.height = 60;

    this.setPercent(this.percent);

  }
  

  setPercent(percent) {
    this.percent = percent;
    let path = this.BOTTLESTATUSBAR_IMAGES[this.resolveImageIndex()];
    this.img = this.imageCahche[path];
  }

  resolveImageIndex() {
    if (this.percent >= 80) {
      return 5;
    } else if (this.percent >= 60) {
      return 4;
    } else if (this.percent >= 40) {
      return 3;
    } else if (this.percent >= 20) {
      return 2;
    } else if (this.percent > 0) {
      return 1;
    } else {
      return 0;
    }
  }

}

