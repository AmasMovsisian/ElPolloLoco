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


  loadAllAnimations() {
    this.loadImages(this.IMAGE_ALERT_END_BOSS);
    this.loadImages(this.IMAGE_WALKING_END_BOSS);
    this.loadImages(this.IMAGE_ATTACK_END_BOSS);
    this.loadImages(this.IMAGE_HURT_END_BOSS);
    this.loadImages(this.IMAGE_DEAD_END_BOSS);
  }


  playBossSound(state) {
    if (this.currentSound === state) return;
    if (this.currentSound === "walking") AudioHub.stop(AudioHub.endBossWalking);
    if (this.currentSound === "attack") AudioHub.stop(AudioHub.endBossAttack);
    if (state === "walking") AudioHub.playLoop(AudioHub.endBossWalking);
    if (state === "attack") AudioHub.playLoop(AudioHub.endBossAttack);
    this.currentSound = state;
  }


  stopAllBossSounds() {
    AudioHub.stop(AudioHub.endBossWalking);
    AudioHub.stop(AudioHub.endBossAttack);
    this.currentSound = null;
  }


  animate() {
    this.animationInterval = setInterval(() => this.updateAnimation(), 100);
    this.movementInterval = setInterval(() => this.updateMovement(), 1000 / 24);
  }


  updateAnimation() {
    if (this.isDead) return this.handleDeathAnimation();
    if (this.isHurt) return this.handleHurtAnimation();
    this.handleEnergyBasedAnimation();
  }


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


stopCharacter() {
  if (world && world.character) {
    world.character.speed = 0;
    world.keyboard = {};
    if (world.character.stopAnimations) {
      world.character.stopAnimations();
    }
  }
}


  handleHurtAnimation() {
    this.playAnimation(this.IMAGE_HURT_END_BOSS);
    setTimeout(() => (this.isHurt = false), 500);
  }


  handleEnergyBasedAnimation() {
    if (this.isKillingActive || this.energy <= 60) {
      this.playAnimation(this.IMAGE_ATTACK_END_BOSS);
      this.playBossSound("attack");
    } else if (this.energy <= 80) {
      this.playAnimation(this.IMAGE_WALKING_END_BOSS);
      if (this.isReallyWalking) this.playBossSound("walking");
    } else {
      this.playAnimation(this.IMAGE_ALERT_END_BOSS);
      this.playBossSound(null);
    }
  }


  updateMovement() {
    if (this.isDead) return;
    let before = this.x;
    if (this.energy <= 80 && this.energy > 0) {
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


  startKillingMode() {
    this.isKillingActive = true;
    this.playBossSound("attack");
    this.jump();
  }


  stopKillingMode() {
    this.isKillingActive = false;
  }


  hit(damage = 2) {
    if (this.isDead) return;
    this.energy -= damage;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead = true;
    }
    this.isHurt = true;
  }


  stopAnimations() {
    clearInterval(this.animationInterval);
    clearInterval(this.movementInterval);
    this.stopAllBossSounds();
  }
}