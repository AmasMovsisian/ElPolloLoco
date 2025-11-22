class Chicken extends Movableobject{

    height = 72;
    width = 72;
    y = 360;

     IMAGES_WALKING_CHICKEN = [
            'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
            'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ];

      constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_WALKING_CHICKEN); 
        this.animate();
        this.moveLeft();
    }

    animate(){
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING_CHICKEN);
            }, 90);

    }
}