class Endboss extends Movableobject {

    height = 400;
    width = 250;
    y = 60;

    IMAGE_WALKING_END_BOSS = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGE_WALKING_END_BOSS);
        this.x = 2600;
        this.animate();

    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE_WALKING_END_BOSS);
        }, 100);
    }

}