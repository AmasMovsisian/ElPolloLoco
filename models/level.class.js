/**
 * Represents a game level containing all game objects and their positions.
 */
class Level {
  enemies;
  endboss;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  level_end_x;
  end_of_X;

  
  /**
   * Creates a new level with the specified game objects.
   * @param {Array} enemies - Array of enemy objects.
   * @param {Array} endboss - Array of endboss objects.
   * @param {Array} clouds - Array of cloud objects.
   * @param {Array} coins - Array of coin objects.
   * @param {Array} bottles - Array of bottle objects.
   * @param {Array} backgroundObjects - Array of background objects.
   */
  constructor(enemies, endboss, clouds, coins, bottles, backgroundObjects) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.coins = coins;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
    this.endboss_X();
  }

  
  /**
   * Updates the level end position based on the endboss's X coordinate.
   */
  endboss_X() {
    for (let i = 0; i < this.endboss.length; i++) {
      setInterval(() => {
        this.end_of_X = this.endboss[i].x - 50;
        this.level_end_x = this.end_of_X;
      }, 1000 / 24);
    }
  }
}