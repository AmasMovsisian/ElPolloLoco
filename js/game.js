let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = false;

function rotationCheckDisplay() {
    const warnBox = document.getElementById("rotationWarningBox");
    const canvasBox = document.getElementById("canvas");

    if (!warnBox || !canvasBox) return;
    if (window.innerWidth < 740 && window.innerHeight > window.innerWidth) {
        warnBox.style.display = "flex";
        canvasBox.style.display = "none";
    } else {
        warnBox.style.display = "none";
        if (gameRunning) canvasBox.style.display = "block";
    }
}


window.addEventListener("resize", rotationCheckDisplay);
window.addEventListener("orientationchange", rotationCheckDisplay);
window.addEventListener("load", rotationCheckDisplay);

function toggleMobileButtons() {
    const mobileBtns = document.getElementById("mobileIconsContainer");

    const isMobile = window.innerWidth < 900;
    const isLandscape = window.innerWidth > window.innerHeight;

    if (gameRunning && isMobile && isLandscape) {
        mobileBtns.style.display = "block";
    } else {
        mobileBtns.style.display = "none";
    }
}

window.addEventListener("resize", toggleMobileButtons);
window.addEventListener("orientationchange", toggleMobileButtons);
window.addEventListener("load", toggleMobileButtons);


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

function stopAllGameProcesses() {
    gameRunning = false;

    if (world && world.statusBar && world.statusBar.deathTimeout) {
        clearTimeout(world.statusBar.deathTimeout);
    }
    if (world && world.endBossStatusbar && world.endBossStatusbar.deathTimeout) {
        clearTimeout(world.endBossStatusbar.deathTimeout);
    }
    if (world && world.stopGame) {
        world.stopGame();
    }
    if (world && world.character && world.character.stopAnimations) {
        world.character.stopAnimations();
    }
    if (world && world.level && world.level.enemies) {
        world.level.enemies.forEach(enemy => {
            if (enemy.stopAnimations) enemy.stopAnimations();
        });
    }
    if (world && world.level && world.level.endboss) {
        world.level.endboss.forEach(boss => {
            if (boss.stopAnimations) boss.stopAnimations();
        });
    }

    const highestId = window.setTimeout(() => {}, 0);
    for (let i = 0; i < highestId; i++) {
        window.clearTimeout(i);
    }
}

function startGame() {
    const menu = document.getElementById('menu');
    const canvas = document.getElementById('canvas');
    const endMenu = document.getElementById('endMenu');
    const lostMenu = document.getElementById('lostMenu');

    stopAllGameProcesses();

    menu.style.display = 'none';
    endMenu.style.display = 'none';
    lostMenu.style.display = 'none';
    canvas.style.display = 'block';
    gameRunning = true;

    initLevel1();
    init();

    toggleMobileButtons();
}


function home() {
    const menu = document.getElementById('menu');
    const canvas = document.getElementById('canvas');
    const endMenu = document.getElementById('endMenu');
    const lostMenu = document.getElementById('lostMenu');

    stopAllGameProcesses();

    menu.style.display = 'block';
    endMenu.style.display = 'none';
    lostMenu.style.display = 'none';
    canvas.style.display = 'none';

    gameRunning = false;

    toggleMobileButtons();
}

function endGame() {
    stopAllGameProcesses();
    gameRunning = false;

    document.getElementById('endMenu').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('lostMenu').style.display = 'none';
    document.getElementById('canvas').style.display = 'none';

    toggleMobileButtons();
}

function lostGame() {
    stopAllGameProcesses();
    gameRunning = false;

    document.getElementById('lostMenu').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('endMenu').style.display = 'none';
    document.getElementById('canvas').style.display = 'none';

    toggleMobileButtons();
}

document.addEventListener('DOMContentLoaded', function () {
    const leftBtn = document.querySelector('.m-left');
    const rightBtn = document.querySelector('.m-right');
    const jumpBtn = document.querySelector('.m-jump');
    const bottleBtn = document.querySelector('.m-bottle');

    window.addEventListener('keydown', (e) => {
        if (e.code == "ArrowLeft" || e.code == "KeyA") keyboard.LEFT = true;
        if (e.code == "ArrowRight" || e.code == "KeyD") keyboard.RIGHT = true;
        if (e.code == "ArrowUp" || e.code == "KeyW" || e.code == "Space") keyboard.UP = true;
        if (e.code == "ArrowDown" || e.code == "KeyS") keyboard.DOWN = true;
        if (e.code == "KeyF") keyboard.F = true;
    });

    window.addEventListener('keyup', (e) => {
        if (e.code == "ArrowLeft" || e.code == "KeyA") keyboard.LEFT = false;
        if (e.code == "ArrowRight" || e.code == "KeyD") keyboard.RIGHT = false;
        if (e.code == "ArrowUp" || e.code == "KeyW" || e.code == "Space") keyboard.UP = false;
        if (e.code == "ArrowDown" || e.code == "KeyS") keyboard.DOWN = false;
        if (e.code == "KeyF") keyboard.F = false;
    });

    leftBtn.addEventListener('touchstart', () => keyboard.LEFT = true);
    leftBtn.addEventListener('touchend', () => keyboard.LEFT = false);

    rightBtn.addEventListener('touchstart', () => keyboard.RIGHT = true);
    rightBtn.addEventListener('touchend', () => keyboard.RIGHT = false);

    jumpBtn.addEventListener('touchstart', () => keyboard.UP = true);
    jumpBtn.addEventListener('touchend', () => keyboard.UP = false);

    bottleBtn.addEventListener('touchstart', () => keyboard.F = true);
    bottleBtn.addEventListener('touchend', () => keyboard.F = false);
});

const startButton = document.getElementById('startButton');
if (startButton) {
    startButton.addEventListener('click', startGame);
}
