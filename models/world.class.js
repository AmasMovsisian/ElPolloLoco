class World {
  character = new Character();
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
    this.ctx = canvas.getContext("2d");
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
    for (let i = this.level.coins.length - 1; i >= 0; i--) {
      const coin = this.level.coins[i];
      if (this.character.isColliding(coin)) {
        this.coinStatusBar.setPercent(this.coinStatusBar.percent + 10);
        this.level.coins.splice(i, 1);
      }
    }
  }

  checkBottlesCollisions() {
    for (let i = this.level.bottles.length - 1; i >= 0; i--) {
      const bottle = this.level.bottles[i];
      if (this.character.isColliding(bottle)) {
        this.bottleStatusBar.setPercent(this.bottleStatusBar.percentOfBottles + 10);
        this.level.bottles.splice(i, 1);
      }
    }
  }

   checkCollisionsTop() {
     for (let i = this.level.enemies.length - 1; i >= 0; i--) {
      const enemy = this.level.enemies[i];
      if (this.character.isCollidingTop(enemy)) {
       console.log("Yeah killed chicken");
        this.level.enemies.splice(i, 1);
      }
    }
  }

  run() {
    setInterval(() => {
        this.checkCollisionsTop();
      this.checkCollisions();
      this.checkCoinsCollisions();
      this.checkBottlesCollisions();
      this.checkThrowObjects();
    }, 30);
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bootle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
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
    objects.forEach((o) => {
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
