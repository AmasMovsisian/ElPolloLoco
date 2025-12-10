let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = false;
let canThrow = true;


/**
 * Checks device orientation and toggles display of rotation warning and canvas.
 */
function rotationCheckDisplay() {
    try {
        const warnBox = document.getElementById("rotationWarningBox");
        const canvasBox = document.getElementById("canvas");
        if (!warnBox || !canvasBox) return;
        const isMobilePortrait = window.innerWidth < 740 && window.innerHeight > window.innerWidth;
        warnBox.style.display = isMobilePortrait ? "flex" : "none";
        canvasBox.style.display = gameRunning && !isMobilePortrait ? "block" : "none";
    } catch (error) {
        console.warn("Rotation check failed:", error);
    }
}


/**
 * Shows or hides mobile control buttons based on screen size and orientation.
 */
function toggleMobileButtons() {
    try {
        const mobileBtns = document.getElementById("mobileIconsContainer");
        if (!mobileBtns) return;
        const isMobile = window.innerWidth < 900;
        const isLandscape = window.innerWidth > window.innerHeight;
        mobileBtns.style.display = gameRunning && isMobile && isLandscape ? "block" : "none";
    } catch (error) {
        console.warn("Toggle mobile buttons failed:", error);
    }
}


/**
 * Initializes the game world and canvas.
 */
function init() {
    canvas = document.getElementById("canvas");
    if (canvas) {
        world = new World(canvas, keyboard);
    }
}


/**
 * Stops all active game processes, timeouts, and animations.
 */
function stopAllGameProcesses() {
    gameRunning = false;
    if (!world) return;
    clearStatusbarTimeouts();
    callStopMethods();
    stopAllAnimations();
}


/**
 * Clears timeout references from status bars.
 */
function clearStatusbarTimeouts() {
    if (world.statusBar?.deathTimeout) clearTimeout(world.statusBar.deathTimeout);
    if (world.endBossStatusbar?.deathTimeout) clearTimeout(world.endBossStatusbar.deathTimeout);
}


/**
 * Calls stop methods on world and character if they exist.
 */
function callStopMethods() {
    world.stopGame?.();
    world.character?.stopAnimations?.();
}


/**
 * Stops all enemy and boss animations.
 */
function stopAllAnimations() {
    stopEnemyAnimations();
    stopBossAnimations();
}


/**
 * Stops animations for all enemies in the level.
 */
function stopEnemyAnimations() {
    world.level?.enemies?.forEach(enemy => enemy.stopAnimations?.());
}


/**
 * Stops animations for all endboss instances in the level.
 */
function stopBossAnimations() {
    world.level?.endboss?.forEach(boss => boss.stopAnimations?.());
}


/**
 * Retrieves key DOM elements for the game interface.
 * @returns {Object} Collection of game UI elements.
 */
function getGameElements() {
    return {
        menu: document.getElementById('menu'),
        canvas: document.getElementById('canvas'),
        endMenu: document.getElementById('endMenu'),
        lostMenu: document.getElementById('lostMenu'),
        audioToggle: document.getElementById('audioToggleBTN')
    };
}


/**
 * Starts the game, hides menus, and initializes game state.
 */
function startGame() {
    const el = getGameElements();
    stopAllGameProcesses();
    el.menu.style.display = 'none';
    el.endMenu.style.display = 'none';
    el.lostMenu.style.display = 'none';
    el.canvas.style.display = 'block';
    if (el.audioToggle) el.audioToggle.style.display = 'block';
    gameRunning = true;
    if (typeof initLevel1 === 'function') initLevel1();
    init();
    rotationCheckDisplay();
    toggleMobileButtons();
}


/**
 * Returns to the main menu and resets game state.
 */
function home() {
    const el = getGameElements();
    stopAllGameProcesses();
    el.menu.style.display = 'block';
    el.endMenu.style.display = 'none';
    el.lostMenu.style.display = 'none';
    el.canvas.style.display = 'none';
    if (el.audioToggle) el.audioToggle.style.display = 'none';
    gameRunning = false;
    rotationCheckDisplay();
    toggleMobileButtons();
}


/**
 * Ends the game successfully and shows the end screen.
 */
function endGame() {
  const el = getGameElements();
  stopAllGameProcesses();
  AudioHub.stopAllCharacterSounds();
  gameRunning = false;
  el.endMenu.style.display = 'block';
  el.menu.style.display = 'none';
  el.lostMenu.style.display = 'none';
  el.canvas.style.display = 'none';
  if (el.audioToggle) el.audioToggle.style.display = 'none';
  rotationCheckDisplay();
  toggleMobileButtons();
}


/**
 * Handles game loss, plays sound, and shows the loss screen.
 */
function lostGame() {
    const el = getGameElements();
    stopAllGameProcesses();
    AudioHub.stopAllCharacterSounds();
    gameRunning = false;
    AudioHub.playOne(AudioHub.characterLost);
    el.lostMenu.style.display = 'block';
    el.menu.style.display = 'none';
    el.endMenu.style.display = 'none';
    el.canvas.style.display = 'none';
    if (el.audioToggle) el.audioToggle.style.display = 'none';
    rotationCheckDisplay();
    toggleMobileButtons();
}


window.addEventListener("resize", function() {
    rotationCheckDisplay();
    toggleMobileButtons();
});


window.addEventListener("orientationchange", function() {
    setTimeout(() => {
        rotationCheckDisplay();
        toggleMobileButtons();
    }, 100);
});


window.addEventListener("load", function() {
    rotationCheckDisplay();
    toggleMobileButtons();
    
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', startGame);
    }
});


/**
 * Sets a key state in the keyboard object.
 * @param {string} key - The key identifier.
 * @param {boolean} value - The pressed state (true/false).
 */
const setKey = (key, value) => {
    if (typeof keyboard !== 'undefined' && keyboard) keyboard[key] = value;
};


/**
 * Temporarily disables throwing, then re-enables after a delay.
 */
function allowThrowLater() {
    canThrow = false;
    setTimeout(() => canThrow = true, 2000);
}


/**
 * Handles keyboard throwing action with cooldown.
 */
function handleThrowKey() {
    if (!canThrow) return;
    setKey('F', true);
    allowThrowLater();
}


/**
 * Handles touch throwing action with cooldown.
 */
function handleThrowTouch() {
    if (!canThrow) return;
    setKey('F', true);
    allowThrowLater();
}


/**
 * Adds touch event listeners to a control element.
 * @param {HTMLElement} element - The DOM element to attach listeners to.
 * @param {string} key - The key identifier to set when touched.
 */
function addTouchControl(element, key) {
    if (!element) return;
    element.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (key === 'F') return handleThrowTouch();
        setKey(key, true);
    }, { passive: false });
    element.addEventListener('touchend', (e) => { e.preventDefault(); setKey(key, false); }, { passive: false });
    element.addEventListener('touchcancel', (e) => { e.preventDefault(); setKey(key, false); }, { passive: false });
}


document.addEventListener('DOMContentLoaded', function() {
    const leftBtn = document.querySelector('.m-left');
    const rightBtn = document.querySelector('.m-right');
    const jumpBtn = document.querySelector('.m-jump');
    const bottleBtn = document.querySelector('.m-bottle');

    addTouchControl(leftBtn, 'LEFT');
    addTouchControl(rightBtn, 'RIGHT');
    addTouchControl(jumpBtn, 'UP');
    addTouchControl(bottleBtn, 'F');

    window.addEventListener('keydown', (e) => {
        if (e.code === "KeyF") return handleThrowKey();
        if (e.code == "ArrowLeft" || e.code == "KeyA") setKey('LEFT', true);
        if (e.code == "ArrowRight" || e.code == "KeyD") setKey('RIGHT', true);
        if (e.code == "ArrowUp" || e.code == "KeyW" || e.code == "Space") setKey('UP', true);
        if (e.code == "ArrowDown" || e.code == "KeyS") setKey('DOWN', true);
    });

    window.addEventListener('keyup', (e) => {
        if (e.code == "ArrowLeft" || e.code == "KeyA") setKey('LEFT', false);
        if (e.code == "ArrowRight" || e.code == "KeyD") setKey('RIGHT', false);
        if (e.code == "ArrowUp" || e.code == "KeyW" || e.code == "Space") setKey('UP', false);
        if (e.code == "ArrowDown" || e.code == "KeyS") setKey('DOWN', false);
        if (e.code == "KeyF") setKey('F', false);
    });
});