/**
 * Represents the final boss enemy with multiple states and complex behavior.
 * Manages walking, attacking, hurting, and death animations with sound control.
 */
class Endboss extends Movableobject {
  height = 400;
  width = 250;
  offset = {
      top: 50,
      bottom: 15,
      left: 30,
      right: 30,
    };

  
  IMAGE_WALKING_END_BOSS = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];


  IMAGE_ALERT_END_BOSS = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];


  IMAGE_ATTACK_END_BOSS = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];


  IMAGE_HURT_END_BOSS = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];


  IMAGE_DEAD_END_BOSS = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Initializes the end boss with starting position, health, and animations.
   */
  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.x = 10000;
    this.y = 60;
    this.speed = 5;
    this.energy = 100;
    this.isDead = false;
    this.isHurt = false;
    this.isKillingActive = false;
    this.currentSound = null;
    this.isReallyWalking = false;
    this.loadAllAnimations();
    this.animate();
  }


  /**
   * Preloads all animation image sets for the end boss.
   */
  loadAllAnimations() {
    this.loadImages(this.IMAGE_ALERT_END_BOSS);
    this.loadImages(this.IMAGE_WALKING_END_BOSS);
    this.loadImages(this.IMAGE_ATTACK_END_BOSS);
    this.loadImages(this.IMAGE_HURT_END_BOSS);
    this.loadImages(this.IMAGE_DEAD_END_BOSS);
  }


  /**
   * Plays or stops boss sounds based on current state.
   * @param {string|null} state - The sound state to play ('walking', 'attack', or null).
   */
  playBossSound(state) {
    if (this.currentSound === state) return;
    if (this.currentSound === "walking") AudioHub.stop(AudioHub.endBossWalking);
    if (this.currentSound === "attack") AudioHub.stop(AudioHub.endBossAttack);
    if (state === "walking") AudioHub.playLoop(AudioHub.endBossWalking);
    if (state === "attack") AudioHub.playLoop(AudioHub.endBossAttack);
    this.currentSound = state;
  }


  /**
   * Stops all currently playing boss sounds.
   */
  stopAllBossSounds() {
    AudioHub.stop(AudioHub.endBossWalking);
    AudioHub.stop(AudioHub.endBossAttack);
    this.currentSound = null;
  }


  /**
   * Starts the animation and movement intervals for the end boss.
   */
  animate() {
    this.animationInterval = setInterval(() => this.updateAnimation(), 100);
    this.movementInterval = setInterval(() => this.updateMovement(), 1000 / 24);
  }


  /**
   * Updates the boss animation based on current state and energy.
   */
  updateAnimation() {
    if (this.isDead) return this.handleDeathAnimation();
    if (this.isHurt) return this.handleHurtAnimation();
    this.handleEnergyBasedAnimation();
  }


  /**
   * Handles the death animation sequence and triggers win state.
   */
  handleDeathAnimation() {
  this.playAnimation(this.IMAGE_DEAD_END_BOSS);
  this.stopCharacter(); 
  setTimeout(() => {
    this.stopAllBossSounds();
    if (world.character.energy > 0) AudioHub.playOne(AudioHub.characterWon);
    clearInterval(this.animationInterval);
    clearInterval(this.movementInterval);
    AudioHub.stopAllCharacterSounds();
    if (typeof endGame === 'function') endGame();
  }, 500);
}


  /**
   * Stops character movement and input when boss is defeated.
   */
stopCharacter() {
  if (world && world.character) {
    world.character.speed = 0;
    world.keyboard = {};
    if (world.character.stopAnimations) {
      world.character.stopAnimations();
    }
  }
}


  /**
   * Handles hurt animation when boss takes damage.
   */
  handleHurtAnimation() {
    this.playAnimation(this.IMAGE_HURT_END_BOSS);
    setTimeout(() => (this.isHurt = false), 500);
  }


  /**
   * Selects animation based on boss energy level and state.
   */
  handleEnergyBasedAnimation() {
    if (this.isKillingActive || this.energy <= 60) {
      this.playAnimation(this.IMAGE_ATTACK_END_BOSS);
      this.playBossSound("attack");
    } else if (this.energy < 100) {
      this.playAnimation(this.IMAGE_WALKING_END_BOSS);
      if (this.isReallyWalking) this.playBossSound("walking");
    } else {
      this.playAnimation(this.IMAGE_ALERT_END_BOSS);
      this.playBossSound(null);
    }
  }


  /**
   * Updates boss movement based on distance to character and energy.
   */
  updateMovement() {
    if (this.isDead) return;
    let before = this.x;
    if (this.energy < 100 && this.energy > 0) {
      let dist = Math.abs(this.x - world.character.x);
      if (dist <= 50) {
        if (!this.isKillingActive) this.startKillingMode();
      } else {
        if (this.isKillingActive) this.stopKillingMode();
        this.moveLeft();
      }
    }
    let moved = this.x !== before;
    this.isReallyWalking = moved && !this.isKillingActive;
  }


  /**
   * Activates killing mode when character is close.
   */
  startKillingMode() {
    this.isKillingActive = true;
    this.playBossSound("attack");
    this.jump();
  }


  /**
   * Deactivates killing mode.
   */
  stopKillingMode() {
    this.isKillingActive = false;
  }


  /**
   * Applies damage to the boss and updates state.
   * @param {number} damage - Amount of damage to inflict (default: 2).
   */
  hit(damage = 2) {
    if (this.isDead) return;
    this.energy -= damage;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead = true;
    }
    this.isHurt = true;
  }


  /**
   * Stops all boss animations and sounds.
   */
  stopAnimations() {
    clearInterval(this.animationInterval);
    clearInterval(this.movementInterval);
    this.stopAllBossSounds();
  }
}