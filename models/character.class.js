class Character extends Movableobject {
  width = 150;
  height = 300;
  y = 135;
  speed = 5;
  offset = {
    top: 125,
    bottom: 15,
    left: 50,
    right: 50,
  };
  lastMovementTime = Date.now();
  isLongIdle = false;
  isSnoring = false;
  world;
  isWalkingSoundPlaying = false;
  idleCheckInterval = null;

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_IDLE_LONG = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGE_JUMP = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGE_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGE_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGE_JUMP);
    this.loadImages(this.IMAGE_DEAD);
    this.loadImages(this.IMAGE_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_IDLE_LONG);
    this.animate();
    this.applyGravity();
  }

  animate() {
    this.checkIdleTime();
    this.setupMovementInterval();
    this.setupAnimationInterval();
  }

  setupMovementInterval() {
    setInterval(() => {
      this.handleMovement();
      this.world.camera_x = -this.x + 200;
    }, 1000 / 120);
  }

  handleMovement() {
    const walkingNow = this.handleWalking();
    this.handleWalkingSound(walkingNow);
    if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround() && !this.isHurt()) {
      this.jump();
      AudioHub.playOne(AudioHub.characterJump);
    }
  }

  handleWalking() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      return true;
    } else if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      return true;
    }
    return false;
  }

  handleWalkingSound(walkingNow) {
    if (walkingNow && !this.isWalkingSoundPlaying) {
      this.isWalkingSoundPlaying = true;
      AudioHub.playLoop(AudioHub.characterWalking);
    } else if (!walkingNow && this.isWalkingSoundPlaying) {
      this.isWalkingSoundPlaying = false;
      AudioHub.stop(AudioHub.characterWalking);
    }
  }

  setupAnimationInterval() {
    setInterval(() => {
      if (this.isDead()) return this.handleDeadState();
      if (this.isHurt()) return this.handleHurtState();
      if (this.isAboveGround()) return this.handleJumpState();
      if (this.isLongIdle) return this.handleLongIdleState();
      this.handleNormalState();
    }, 2000 / 24);
  }

  handleDeadState() {
    this.playOnceAnimation(this.IMAGE_DEAD);
    AudioHub.stop(AudioHub.characterSnoring);
    this.isSnoring = false;
  }

  handleHurtState() {
    AudioHub.stop(AudioHub.characterSnoring);
    this.isSnoring = false;
    this.playAnimation(this.IMAGE_HURT);
  }

  handleJumpState() {
    AudioHub.stop(AudioHub.characterSnoring);
    this.isSnoring = false;
    this.playAnimation(this.IMAGE_JUMP);
  }

  handleLongIdleState() {
    if (!this.isSnoring) {
      AudioHub.playLoop(AudioHub.characterSnoring);
      this.isSnoring = true;
    }
    this.playAnimation(this.IMAGES_IDLE_LONG);
  }

  handleNormalState() {
    AudioHub.stop(AudioHub.characterSnoring);
    this.isSnoring = false;
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  checkIdleTime() {
    this.idleCheckInterval = setInterval(() => {
      if (this.world && this.world.isGameOver) {
        this.isLongIdle = false;
        return;
      }
      const noInput = !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.world.keyboard.UP;
      if (noInput && !this.isLongIdle) {
        const idleDuration = Date.now() - this.lastMovementTime;
        if (idleDuration > 15000) this.isLongIdle = true;
      } else if (!noInput) {
        this.lastMovementTime = Date.now();
        this.isLongIdle = false;
      }
    }, 30);
  }

  stopAnimations() {
    if (this.idleCheckInterval) {
      clearInterval(this.idleCheckInterval);
      this.idleCheckInterval = null;
    }
    this.isLongIdle = false;
    this.isSnoring = false;
    AudioHub.stop(AudioHub.characterSnoring);
    AudioHub.stop(AudioHub.characterWalking);
    this.isWalkingSoundPlaying = false;
  }
}