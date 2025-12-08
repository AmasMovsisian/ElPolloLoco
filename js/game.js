let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = false;

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

function init() {
    canvas = document.getElementById("canvas");
    if (canvas) {
        world = new World(canvas, keyboard);
    }
}

function stopAllGameProcesses() {
    gameRunning = false;
    
    if (world) {
        if (world.statusBar && world.statusBar.deathTimeout) {
            clearTimeout(world.statusBar.deathTimeout);
        }
        if (world.endBossStatusbar && world.endBossStatusbar.deathTimeout) {
            clearTimeout(world.endBossStatusbar.deathTimeout);
        }
        if (world.stopGame) {
            world.stopGame();
        }
        if (world.character && world.character.stopAnimations) {
            world.character.stopAnimations();
        }
        if (world.level && world.level.enemies) {
            world.level.enemies.forEach(enemy => {
                if (enemy.stopAnimations) enemy.stopAnimations();
            });
        }
        if (world.level && world.level.endboss) {
            world.level.endboss.forEach(boss => {
                if (boss.stopAnimations) boss.stopAnimations();
            });
        }
    }
}

function startGame() {
    const menu = document.getElementById('menu');
    const canvas = document.getElementById('canvas');
    const endMenu = document.getElementById('endMenu');
    const lostMenu = document.getElementById('lostMenu');
    const audioToggle = document.getElementById('audioToggleBTN');
    
    stopAllGameProcesses();
    
    menu.style.display = 'none';
    endMenu.style.display = 'none';
    lostMenu.style.display = 'none';
    canvas.style.display = 'block';
    if (audioToggle) audioToggle.style.display = 'block';
    
    gameRunning = true;
    
    if (typeof initLevel1 === 'function') {
        initLevel1();
    }
    init();
    rotationCheckDisplay();
    toggleMobileButtons();
}

function home() {
    const menu = document.getElementById('menu');
    const canvas = document.getElementById('canvas');
    const endMenu = document.getElementById('endMenu');
    const lostMenu = document.getElementById('lostMenu');
    const audioToggle = document.getElementById('audioToggleBTN');
    
    stopAllGameProcesses();
    
    menu.style.display = 'block';
    endMenu.style.display = 'none';
    lostMenu.style.display = 'none';
    canvas.style.display = 'none';
    if (audioToggle) audioToggle.style.display = 'none';
    
    gameRunning = false;
    rotationCheckDisplay();
    toggleMobileButtons();
}

function endGame() {
    stopAllGameProcesses();
    gameRunning = false;
    document.getElementById('endMenu').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('lostMenu').style.display = 'none';
    document.getElementById('canvas').style.display = 'none';
    const audioToggle = document.getElementById('audioToggleBTN');
    if (audioToggle) audioToggle.style.display = 'none';
    
    rotationCheckDisplay();
    toggleMobileButtons();
}

function lostGame() {
    stopAllGameProcesses();
    AudioHub.playOne(AudioHub.characterLost);
    AudioHub.stop(AudioHub.endBossAttack);
    AudioHub.stop(AudioHub.endBossWalking);
    gameRunning = false;
    document.getElementById('lostMenu').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('endMenu').style.display = 'none';
    document.getElementById('canvas').style.display = 'none';
    const audioToggle = document.getElementById('audioToggleBTN');
    if (audioToggle) audioToggle.style.display = 'none';
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

document.addEventListener('DOMContentLoaded', function() {
    const leftBtn = document.querySelector('.m-left');
    const rightBtn = document.querySelector('.m-right');
    const jumpBtn = document.querySelector('.m-jump');
    const bottleBtn = document.querySelector('.m-bottle');
    
    const setKey = (key, value) => {
        if (keyboard) keyboard[key] = value;
    };
    
    const addTouchControl = (element, key) => {
        if (!element) return;
        
        element.addEventListener('touchstart', (e) => {
            e.preventDefault();
            setKey(key, true);
        }, { passive: false });
        
        element.addEventListener('touchend', (e) => {
            e.preventDefault();
            setKey(key, false);
        }, { passive: false });
        
        element.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            setKey(key, false);
        }, { passive: false });
    };
    
    addTouchControl(leftBtn, 'LEFT');
    addTouchControl(rightBtn, 'RIGHT');
    addTouchControl(jumpBtn, 'UP');
    addTouchControl(bottleBtn, 'F');
    
    window.addEventListener('keydown', (e) => {
        if (e.code == "ArrowLeft" || e.code == "KeyA") setKey('LEFT', true);
        if (e.code == "ArrowRight" || e.code == "KeyD") setKey('RIGHT', true);
        if (e.code == "ArrowUp" || e.code == "KeyW" || e.code == "Space") setKey('UP', true);
        if (e.code == "ArrowDown" || e.code == "KeyS") setKey('DOWN', true);
        if (e.code == "KeyF") setKey('F', true);
    });
    
    window.addEventListener('keyup', (e) => {
        if (e.code == "ArrowLeft" || e.code == "KeyA") setKey('LEFT', false);
        if (e.code == "ArrowRight" || e.code == "KeyD") setKey('RIGHT', false);
        if (e.code == "ArrowUp" || e.code == "KeyW" || e.code == "Space") setKey('UP', false);
        if (e.code == "ArrowDown" || e.code == "KeyS") setKey('DOWN', false);
        if (e.code == "KeyF") setKey('F', false);
    });
});