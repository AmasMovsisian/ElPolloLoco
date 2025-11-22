class Movableobject {

    x = 120;
    y = 280;
    img;
    width = 100;
    height = 150;
    imageCahche = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedy = 0;
    acceleration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedy > 0) {
                this.y -= this.speedy;
                this.speedy -= this.acceleration;
            }

        }, 1000 / 25);

    }

    isAboveGround() {
            return this.y < 135;
    }


    loadImage(path) {
        this.img = new Image;
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCahche[path] = img;
        });
    }

    moveLeft(){
          setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 120);
    }

    playAnimation(images){
         let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCahche[path];
            this.currentImage++;
            }

    jump(){
        this.speedy = 30;
    }
 }

