class Endboss extends Movableobject {
    height = 400;
    width = 250;
    y = 60;
    x = 2600;
    energy = 100;
    speed = 5;
    offset = {
        top: 15,
        bottom: 15,
        left: 15,
        right: 15
    }
    
    IMAGE_WALKING_END_BOSS = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    
    IMAGE_ALERT_END_BOSS = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    
    IMAGE_ATTACK_END_BOSS = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    
    IMAGE_HURT_END_BOSS = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    
    IMAGE_DEAD_END_BOSS = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGE_ALERT_END_BOSS);
        this.loadImages(this.IMAGE_WALKING_END_BOSS);
        this.loadImages(this.IMAGE_ATTACK_END_BOSS);
        this.loadImages(this.IMAGE_HURT_END_BOSS);
        this.loadImages(this.IMAGE_DEAD_END_BOSS);
        this.x = 2600;
        this.animate();
        this.isDead = false;
    }

    animate() {
        this.animationInterval = setInterval(() => {
            this.updateAnimation();
        }, 100);

        this.movementInterval = setInterval(() => {
            this.updateMovement();
        }, 1000 / 24);
    }

    updateAnimation() {
        if (this.isDead) {
            this.playAnimation(this.IMAGE_DEAD_END_BOSS);
            if (this.animationInterval) {
                clearInterval(this.animationInterval);
                this.animationInterval = null;
            }
            if (this.movementInterval) {
                clearInterval(this.movementInterval);
                this.movementInterval = null;
            }
        } else if (this.isHurt) {
            this.playAnimation(this.IMAGE_HURT_END_BOSS);
            setTimeout(() => {
                this.isHurt = false;
            }, 500);
        } else if (this.isKillingActive) {
            this.playAnimation(this.IMAGE_ATTACK_END_BOSS);
        } else if (this.energy <= 60) {
            this.playAnimation(this.IMAGE_ATTACK_END_BOSS);
        } else if (this.energy <= 80) {
            this.playAnimation(this.IMAGE_WALKING_END_BOSS);
        } else {
            this.playAnimation(this.IMAGE_ALERT_END_BOSS);
        }
    }

    updateMovement() {
        if (this.isDead) return;
        
        if (this.energy <= 80 && this.energy > 0) {
            if (Math.abs(this.x - world.character.x) <= 100) {
                if (!this.isKillingActive) {
                    this.startKillingMode();
                }
            } else {
                if (this.isKillingActive) {
                    this.stopKillingMode();
                }
                this.moveLeft();
            }
        }
    }

    startKillingMode() {
        this.isKillingActive = true;
        this.speed = 5;
        this.jump();
    }

    stopKillingMode() {
        this.isKillingActive = false;
        this.speed = 5;
    }

    hit(damage = 2) {
        if (this.isDead) return;
        
        this.energy -= damage;
        if (this.energy < 0) this.energy = 0;
        this.isHurt = true;
        if (this.energy <= 0) {
            this.isDead = true;
        }
    }
}