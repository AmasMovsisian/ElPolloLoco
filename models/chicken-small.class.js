class SmallChicken extends Movableobject {
    
    height = 50;
    width = 50;
    y = 380;
    isDead = false;
    isHitFromTop = false;
    isHitFromBottle = false;

    IMAGE_DEAD_SMALL_CHICKEN = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    IMAGES_WALKING_SMALL_CHICKEN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    BOTTLE_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING_SMALL_CHICKEN[0]);
        this.loadImages(this.IMAGES_WALKING_SMALL_CHICKEN);

        this.x = 500 + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING_SMALL_CHICKEN);
            } else if (this.isHitFromBottle) {
            } else {
                this.loadImage(this.IMAGE_DEAD_SMALL_CHICKEN[0]);
            }
        }, 100);
    }

    splash() {
        this.isDead = true;
        this.isHitFromBottle = true;
        this.frame = 0;

        this.splashInterval = setInterval(() => {
            if (this.frame < this.BOTTLE_SPLASH.length) {
                this.loadImage(this.BOTTLE_SPLASH[this.frame]);
                this.frame++;
            } else {
                clearInterval(this.splashInterval);
                this.toRemove = true;
            }
        }, 50);
    }
}
