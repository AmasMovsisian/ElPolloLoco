class Movableobject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedy = 0;
    acceleration = 2.5;
    energy = 100;
    coinCrowd = 0;
    lasthit = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    rX;
    rY;
    rW;
    rH;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedy > 0) {
                this.y -= this.speedy;
                this.speedy -= this.acceleration;
            }

        }, 1000 / 25);

    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 135;
        }
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit() {
        this.energy -= 10;
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

    playOnceAnimation(images) {
        if (this.currentImageDead < images.length) {
            let path = images[this.currentImageDead];
            this.img = this.imageCahche[path];
            this.currentImageDead++;
        }
    }

    jump() {
        this.speedy = 30;
    }
}

