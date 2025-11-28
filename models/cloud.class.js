class Cloud extends Movableobject {
    y = 10;
    width = 500;
    height = 250;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * (5000 - 200) + 200;
        this.y = Math.random() * (70 - 10) + 10;
      
        this.animate();

    }

    animate() {
        this.moveLeft();

    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 120);
    }

}