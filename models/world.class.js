class World {
    character = new Character;
    level = level1;

    ctx;
    canvas;

    keyboard;
    camera_x = 0;

    statusBar = new StatusBar();
    throwableObjects = [];

    coinStatusBar = new CoinStatusBar();
    bottleStatusBar = new BottleStatusBar();

    
  

   

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

  

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercent(this.character.energy);
            }
        });
    }

    checkCoinsCollisions() {
    // Wir müssen sicherstellen, dass das Array während der Iteration modifiziert werden kann.
    // Wir iterieren durch das Array von hinten, damit das Entfernen eines Elements das Iterieren nicht beeinflusst.
    for (let i = this.level.coins.length - 1; i >= 0; i--) {
        const coin = this.level.coins[i];
        
        // Überprüfe die Kollision
        if (this.character.isColliding(coin)) {
            console.log("Kollidiert mit Coin");

            // Erhöhe den Prozentwert der Coin Status Bar
            this.coinStatusBar.setPercent(this.coinStatusBar.percent + 10); 
            console.log("Neue Coin-Status-Bar Prozent: ", this.coinStatusBar.percent);
            
            // Entferne die Coin aus dem Array, da sie eingesammelt wurde
            this.level.coins.splice(i, 1); // Entfernt die Coin an Index i
        }
    }
}


      run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCoinsCollisions()
            this.checkThrowObjects();
        }, 60);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bootle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bootle);
        }
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0);
       
        this.addToMap(this.statusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
    
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);
        
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        mo.drawFrame(this.ctx);


        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
