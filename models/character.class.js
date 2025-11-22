class Character extends Movableobject {

    width = 150;
    height = 300;
    y = 135;
    speed = 5;
    IMAGES_WALKING = [
            'img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-22.png',
            'img/2_character_pepe/2_walk/W-23.png',
            'img/2_character_pepe/2_walk/W-24.png',
            'img/2_character_pepe/2_walk/W-25.png',
            'img/2_character_pepe/2_walk/W-26.png'
        ];
    world;


    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING); 
        this.animate();
    }

    animate(){

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;

            } else if (this.world.keyboard.LEFT && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 120);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
            }, 70);

    }

}