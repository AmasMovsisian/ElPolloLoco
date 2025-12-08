class World {
  character = new Character();
  smallChickens = new SmallChicken();
  chicken = new Chicken();
  endboss = new Endboss();
  level = level1;

  ctx;
  canvas;

  keyboard;
  camera_x = 0;

  statusBar = new StatusBar();
  throwableObjects = [];

  coinStatusBar = new CoinStatusBar();
  bottleStatusBar = new BottleStatusBar();

  bottlesToThrow = 0;
  lastDPressed = false;

  bottlesThrown = [];

  endBossStatusbar = new EndbossStatusBar();

  gameIntervals = [];
  isGameRunning = true;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.startGameLoop();
    this.bottlesThrown = [];
  }

  startGameLoop() {
    this.isGameRunning = true;
    this.draw();
    this.run();
  }

  stopGame() {
    this.isGameRunning = false;
    this.gameIntervals.forEach(clearInterval);
    this.gameIntervals = [];
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.throwableObjects.forEach((obj) => {
      if (obj.stopAnimation) obj.stopAnimation();
    });
    this.throwableObjects = [];
  }

  checkCollisions() {
    if (!this.isGameRunning) return;
    this.level.enemies.forEach((enemy) => {
      if (enemy.isHitFromTop) return;
      if (this.character.isColliding(enemy)) {
         AudioHub.playOne(AudioHub.characterHurt);
        this.character.hit();
        this.statusBar.setPercent(this.character.energy);
      }
    });

    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
       
        AudioHub.playOne(AudioHub.characterHurt);
        this.character.hit();
        this.statusBar.setPercent(this.character.energy);
      }
    });
  }

  checkCoinsCollisions() {
    if (!this.isGameRunning) return;

    for (let i = this.level.coins.length - 1; i >= 0; i--) {
      const coin = this.level.coins[i];
      if (this.character.isColliding(coin)) {
        this.coinStatusBar.setPercent(this.coinStatusBar.percent + 10);
        AudioHub.playOne(AudioHub.coinCollect);
        this.level.coins.splice(i, 1);
      }
    }
  }

  checkBottlesCollisions() {
    if (!this.isGameRunning) return;

    for (let i = this.level.bottles.length - 1; i >= 0; i--) {
      const bottle = this.level.bottles[i];
      if (this.character.isColliding(bottle)) {
        AudioHub.playOne(AudioHub.bottleCollect);
        this.bottleStatusBar.setPercent(
          this.bottleStatusBar.percentOfBottles + 10
        );
        this.level.bottles.splice(i, 1);
        this.bottlesToThrow++;
      }
    }
  }

  checkCollisionsTop() {
    if (!this.isGameRunning) return;

    for (let i = this.level.enemies.length - 1; i >= 0; i--) {
      const enemy = this.level.enemies[i];

      if (this.character.isCollidingTop(enemy) && this.character.isAboveGround()) {
        enemy.isHitFromTop = true;
        enemy.enemyWasHit();
        if (enemy instanceof Chicken) {
          AudioHub.playOne(AudioHub.chickenHurt);
        }

        if (enemy instanceof SmallChicken) {
          AudioHub.playOne(AudioHub.smallChickenHurt);
        }

        this.isHitFromBottle = true;
        setTimeout(() => {
          if (this.isGameRunning) {
            this.level.enemies.splice(i, 1);
          }
        }, 200);
      }
    }
  }

  checkBottleEnemyCollisions() {
    if (!this.isGameRunning) return;
    for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
      const bottle = this.throwableObjects[i];
      for (let j = this.level.enemies.length - 1; j >= 0; j--) {
        const enemy = this.level.enemies[j];
        if (bottle.isColliding(enemy)) {
          if (typeof enemy.splash === "function") {
            AudioHub.playOne(AudioHub.bottleHit);
            enemy.splash();
          } else {
            enemy.isDead = true;
            enemy.toRemove = true;
          }
          bottle.toRemove = true;
          setTimeout(() => {
            if (this.isGameRunning) {
              this.level.enemies = this.level.enemies.filter(
                (e) => e !== enemy
              );
            }
          }, 400);

          break;
        }
      }
    }
    this.throwableObjects = this.throwableObjects.filter((b) => !b.toRemove);
  }

  checkBottleEndbossCollision() {
    if (!this.isGameRunning) return;
    for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
      const bottle = this.throwableObjects[i];
      for (let j = this.level.endboss.length - 1; j >= 0; j--) {
        const bigenemy = this.level.endboss[j];
        if (bottle.isColliding(bigenemy)) {
          AudioHub.playOne(AudioHub.bottleHit);
          AudioHub.playOne(AudioHub.endBossHurt);
          bigenemy.hit(10);
          this.endBossStatusbar.setPercent(bigenemy.energy);
          bottle.toRemove = true;

          break;
        }
      }
    }
    this.throwableObjects = this.throwableObjects.filter((b) => !b.toRemove);
  }

  run() {
    const intervalId = setInterval(() => {
      if (!this.isGameRunning) {
        clearInterval(intervalId);
        return;
      }

      this.checkCollisionsTop();
      this.checkCollisions();
      this.checkCoinsCollisions();
      this.checkBottlesCollisions();
      this.checkBottleEnemyCollisions();
      this.checkThrowObjects();
      this.checkBottleEndbossCollision();
    }, 30);
    this.gameIntervals.push(intervalId);
  }

  pickUpBottle() {
    if (!this.isGameRunning) return;
    this.bottlesToThrow++;
  }

  checkThrowObjects() {
    if (!this.isGameRunning) return;

    if (this.keyboard.F && !this.lastFPressed && this.bottlesToThrow > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.bottlesToThrow--;
      this.bottleStatusBar.setPercent(
        this.bottleStatusBar.percentOfBottles - 10
      );
    }
    this.lastFPressed = this.keyboard.F;
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    if (!this.isGameRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);

    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
    this.showEndBossStatusBar();

    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    this.animationFrameId = requestAnimationFrame(function () {
      self.draw();
    });
  }

  showEndBossStatusBar() {
    if (this.endBossStatusbarShown === undefined) {
      this.endBossStatusbarShown = false;
    }
    if (
      !this.endBossStatusbarShown &&
      this.endboss.x - this.character.x <= 450
    ) {
      this.endBossStatusbarShown = true;
    }
    if (this.endBossStatusbarShown) {
      return this.addToMap(this.endBossStatusbar);
    }
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
