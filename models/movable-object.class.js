class Movableobject extends DrawableObject {

   
    
    speed = 0.15;
    otherDirection = false;
    speedy = 0;
    acceleration = 2.5;
    energy = 100;
    lasthit = 0;

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


    

 

   
  

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lasthit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lasthit;
        timepassed = timepassed / 1000; 
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCahche[path];
        this.currentImage++;
    }

    jump() {
        this.speedy = 30;
    }
}

