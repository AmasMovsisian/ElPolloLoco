class SmallChicken extends Movableobject {
    
    height = 50;
    width = 50;
    y = 380;
    isDead = false;
    isHitFromTop = false;

    IMAGE_DEAD_SMALL_CHICKEN = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    IMAGES_WALKING_SMALL_CHICKEN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING_SMALL_CHICKEN[0]);
        this.loadImages(this.IMAGES_WALKING_SMALL_CHICKEN);

        this.x = 500 + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    enemyWasHit() {
        this.isDead = true;
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) 
                this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING_SMALL_CHICKEN);
            } else {
                this.loadImage(this.IMAGE_DEAD_SMALL_CHICKEN[0]);
            }
        }, 100);
    }
}
