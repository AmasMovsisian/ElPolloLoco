class SmallChicken extends Movableobject {
    
    height = 50;
    width = 50;
    y = 380;
    speed;

    IMAGES_WALKING_SMALL_CHICKEN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING_SMALL_CHICKEN);
        this.x = 500 + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.moveLeft();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 120);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING_SMALL_CHICKEN);
        }, 90);

    }
}