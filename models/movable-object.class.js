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
    energy = 100;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    hit() {
        if (this.energy > 0) {
            this.energy -= 5;
        }
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

