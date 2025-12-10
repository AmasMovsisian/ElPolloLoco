class Level {
  enemies;
  endboss;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  level_end_x;
  end_of_X;

  constructor(enemies, endboss, clouds, coins, bottles, backgroundObjects) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.coins = coins;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
    this.endboss_X();
  }

  endboss_X() {
    for (let i = 0; i < this.endboss.length; i++) {
      setInterval(() => {
        this.end_of_X = this.endboss[i].x - 50;
        this.level_end_x = this.end_of_X;
      }, 1000 / 24);
    }
  }
}
