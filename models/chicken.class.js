class Chicken extends Movableobject {

    height = 72;
    width = 72;
    y = 360;
    isDead = false;
    isHitFromTop = false;

    // offset = {
    //     top: 5,
    //     bottom: 0,
    //     left: 2,
    //     right: 2
    // }

    IMAGES_WALKING_CHICKEN = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD_CHICKEN = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];



    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_WALKING_CHICKEN);
        this.animate();
        this.moveLeft();
    }

    animate() {

    setInterval(() => {
        if (!this.isDead) this.moveLeft();
    }, 1000/60);

    setInterval(() => {
        if (!this.isDead) this.playAnimation(this.IMAGES_WALKING_CHICKEN);
        else this.loadImage(this.IMAGE_DEAD_CHICKEN[0]);
    }, 100);
}

    
    
}