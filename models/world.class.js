/**
 * Main game world class that manages all game objects, collisions, and rendering.
 */
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


  /**
   * Initializes the game world with canvas and keyboard input.
   * @param {HTMLCanvasElement} canvas - The game canvas element.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.startGameLoop();
    this.bottlesThrown = [];
  }


  /**
   * Starts the main game loop for drawing and updating.
   */
  startGameLoop() {
    this.isGameRunning = true;
    this.draw();
    this.run();
  }


  /**
   * Stops all game processes, intervals, and clears the canvas.
   */
  stopGame() {
    this.isGameRunning = false;
    this.gameIntervals.forEach(clearInterval);
    this.gameIntervals = [];
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.throwableObjects.forEach((obj) => {
      if (obj.stopAnimation) obj.stopAnimation();
    });
    this.throwableObjects = [];
  }


  /**
   * Checks collisions between character and enemies.
   */
  checkCollisions() {
    if (!this.isGameRunning) return;
    this.level.enemies.forEach((enemy) => {
    if (enemy.isHitFromTop) return;
    if (this.character.isColliding(enemy)) this.characterLosesEnergy();
    });
    this.level.endboss.forEach((endboss) => {
    if (this.character.isColliding(endboss)) this.characterLosesEnergy();
    });
  }

  /**
   * Reduces character energy and updates status bar when hit.
   */
  characterLosesEnergy() {
    AudioHub.playOne(AudioHub.characterHurt);
    this.character.hit();
    this.statusBar.setPercent(this.character.energy);
  }


  /**
   * Handles coin collection collisions.
   */
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


  /**
   * Handles bottle collection collisions.
   */
  checkBottlesCollisions() {
    if (!this.isGameRunning) return;
    for (let i = this.level.bottles.length - 1; i >= 0; i--) {
      const bottle = this.level.bottles[i];
      if (this.character.isColliding(bottle)) {
        AudioHub.playOne(AudioHub.bottleCollect);
        this.bottleStatusBar.setPercent(this.bottleStatusBar.percentOfBottles + 10);
        this.level.bottles.splice(i, 1);
        this.bottlesToThrow++;
      }
    }
  }


  /**
   * Checks collisions from the top (jumping on enemies).
   */
checkCollisionsTop() {
  if (!this.isGameRunning) return;
  const hitEnemies = this.level.enemies.filter(e => 
    this.character.isCollidingTop(e) && this.character.isAboveGround()
  );
  hitEnemies.forEach(e => this.hitEnemy(e));
  setTimeout(() => this.removeEnemies(hitEnemies), 200);
}


  /**
   * Processes enemy hit from above.
   * @param {Chicken|SmallChicken} enemy - The enemy that was hit.
   */
hitEnemy(enemy) {
  enemy.isHitFromTop = true;
  enemy.enemyWasHit();
  AudioHub.playOne(enemy instanceof Chicken ? AudioHub.chickenHurt : AudioHub.smallChickenHurt);
  this.isHitFromBottle = true;
}


  /**
   * Removes enemies from the level after they are hit.
   * @param {Array} enemies - Array of enemies to remove.
   */
removeEnemies(enemies) {
  if (this.isGameRunning) {
    this.level.enemies = this.level.enemies.filter(e => !enemies.includes(e));
  }
}


  /**
   * Checks collisions between thrown bottles and enemies.
   */
checkBottleEnemyCollisions() {
  if (!this.isGameRunning) return;
  this.processCollisions();
  this.cleanupObjects();
}


  /**
   * Processes bottle-enemy collision detection.
   */
processCollisions() {
  this.throwableObjects.forEach(bottle => {
    this.level.enemies.forEach(enemy => {
      if (bottle.isColliding(enemy)) this.handleCollision(bottle, enemy);
    });
  });
}


  /**
   * Handles collision between bottle and enemy.
   * @param {ThrowableObject} bottle - The thrown bottle.
   * @param {Chicken|SmallChicken} enemy - The enemy hit by the bottle.
   */
handleCollision(bottle, enemy) {
  AudioHub.playOne(AudioHub.bottleHit);
  enemy.splash?.() || (enemy.isDead = enemy.toRemove = true);
  bottle.toRemove = true;
  setTimeout(() => this.removeEnemy(enemy), 400);
}


  /**
   * Removes a single enemy from the level.
   * @param {Chicken|SmallChicken} enemy - The enemy to remove.
   */
removeEnemy(enemy) {
  if (this.isGameRunning) this.level.enemies = this.level.enemies.filter(e => e !== enemy);
}


  /**
   * Cleans up throwable objects marked for removal.
   */
cleanupObjects() {
  this.throwableObjects = this.throwableObjects.filter(b => !b.toRemove);
}


  /**
   * Checks collisions between thrown bottles and the end boss.
   */
 checkBottleEndbossCollision() {
  if (!this.isGameRunning) return;
  this.throwableObjects.forEach(bottle => {
    this.level.endboss.forEach(bigenemy => {
      if (bottle.isColliding(bigenemy)) this.hitEndboss(bottle, bigenemy);
    });
  });
  this.throwableObjects = this.throwableObjects.filter(b => !b.toRemove);
}


  /**
   * Handles collision between bottle and end boss.
   * @param {ThrowableObject} bottle - The thrown bottle.
   * @param {Endboss} bigenemy - The end boss hit by the bottle.
   */
 hitEndboss(bottle, bigenemy) {
  AudioHub.playOne(AudioHub.bottleHit);
  AudioHub.playOne(AudioHub.endBossHurt);
  bigenemy.hit(10);
  this.endBossStatusbar.setPercent(bigenemy.energy);
  bottle.toRemove = true;
}


  /**
   * Main game update loop that runs at regular intervals.
   */
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


  /**
   * Increments the bottle counter when a bottle is picked up.
   */
  pickUpBottle() {
    if (!this.isGameRunning) return;
    this.bottlesToThrow++;
  }


  /**
   * Checks if player can throw a bottle and creates throwable object.
   */
  checkThrowObjects() {
    if (!this.isGameRunning) return;
    if (this.keyboard.F && !this.lastFPressed && this.bottlesToThrow > 0) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.bottlesToThrow--;
      this.bottleStatusBar.setPercent(
      this.bottleStatusBar.percentOfBottles - 10);
    }
    this.lastFPressed = this.keyboard.F;
  }


  /**
   * Sets the world reference for the character.
   */
  setWorld() {
    this.character.world = this;
  }


  /**
   * Main drawing function that renders the entire game world.
   */
  draw() {
    if (!this.isGameRunning) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawGameBg();
    this. drawGameObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBars();
    this.drawCameras();
    let self = this;
    this.animationFrameId = requestAnimationFrame(function () {
      self.draw();
    });
  }


  /**
   * Draws background elements: background objects, clouds, and throwable objects.
   */
  drawGameBg() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
  }


  /**
   * Draws interactive game objects: character, coins, bottles, enemies, and end boss.
   */
  drawGameObjects() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
  }


  /**
   * Manages camera translation for screen scrolling.
   */
  drawCameras() {
   this.ctx.translate(this.camera_x, 0);
   this.ctx.translate(-this.camera_x, 0);
  }


  /**
   * Draws all status bars (health, coins, bottles, end boss health).
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
    this.showEndBossStatusBar();
  }


  /**
   * Shows the end boss status bar when character gets close enough.
   */
  showEndBossStatusBar() {
    if (this.endBossStatusbarShown === undefined) this.endBossStatusbarShown = false;
    if (!this.endBossStatusbarShown && this.endboss.x - this.character.x <= 450) this.endBossStatusbarShown = true;
    if (this.endBossStatusbarShown) return this.addToMap(this.endBossStatusbar);
  }


  /**
   * Adds multiple objects to the map by calling addToMap for each.
   * @param {Array} objects - Array of drawable objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }


  /**
   * Adds a single object to the map, handling direction flipping if needed.
   * @param {DrawableObject} mo - The movable object to draw.
   */
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


  /**
   * Flips an image horizontally for left-facing sprites.
   * @param {DrawableObject} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }


  /**
   * Restores an image to its original orientation after flipping.
   * @param {DrawableObject} mo - The object to restore.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}