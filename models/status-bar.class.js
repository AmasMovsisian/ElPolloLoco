class StatusBar extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percent = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercent(100);
    }

    setPercent(percent) {
        this.percent = percent;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCahche[path];
    }

    resolveImageIndex() {
        if (this.percent == 100) {
            return 5;
        } else if (this.percent >= 80) {
            return 4;
        }
        else if (this.percent >= 60) {
            return 3;
        }
        else if (this.percent >= 40) {
            return 2;
        }
        else if (this.percent >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}