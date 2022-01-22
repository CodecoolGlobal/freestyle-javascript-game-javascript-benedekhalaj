import * as levels from "./levels.js";
import * as sound from "./sound.js";
import * as slideshow from "./slideshow.js";


export function initMovement() {
    document.addEventListener('keydown', startMovement
    );
}

function startMovement(event) {
    let allowedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (allowedKeys.includes(event.key)) {
        document.removeEventListener('keydown', startMovement);
        go(event.key, 1);
    }
}

function setDirection(direction) {
    const arrowDirection = {
        "ArrowLeft": [0, -1],
        "ArrowRight": [0, 1],
        "ArrowUp": [-1, 0],
        "ArrowDown": [1, 0]
    }
    return arrowDirection[direction]
}


function go(direction, pitch) {
    let [axisX, axisY] = getOriginCoordinates();
    let [directionRow, directionCol] = setDirection(direction);
    let player = document.querySelector(".player");
    let playerColumn = Number(player.dataset.column);
    let playerRow = Number(player.dataset.row);
    let neighbour = document.querySelector(`[data-row="${playerRow + directionRow}"][data-column="${playerColumn + directionCol}"]`);
    if (checkWin(player)) {
        const currentLevel = document.querySelector('.level');

        setTimeout(function () {
            player.classList.add('won');
        }, 200);
        
        setTimeout(() => switchLevel(currentLevel.id.slice(-1)), 2000);

    } else if (neighbour === null) {
        player.classList.remove("player");
        let startingPoint = document.querySelector(`[data-row="${axisX}"][data-column="${axisY}"]`);

        setTimeout(function () {
            startingPoint.classList.add("player");
            initMovement();
        }, 400);
        
    } else if (!neighbour.classList.contains("obstacle")) {
        player.classList.remove("player");
        let stepSound = sound.getStepSound(pitch);
        stepSound.play();
        neighbour.classList.add("player");
        setTimeout(function () {
            go(direction, pitch+1);
        }, 35);
    } else {
        initMovement();
    }
}

function checkWin(player) {
    return player.classList.contains("goal");
}

function resetPosition(){
    let [axisX, axisY] = getOriginCoordinates();
      let player = document.querySelector(".player");
      player.classList.remove("player");
      let startingPoint = document.querySelector(`[data-row="${axisX}"][data-column="${axisY}"]`);
      startingPoint.classList.add("player");
  }
  
  document.addEventListener('keyup', (event) => {
      var name = event.key;
      if (name === 'r' || name === 'R') {
        resetPosition()
      }
    }, false);
  

function getOriginCoordinates() {
    let coordinates = document.getElementById("playerOrigin");
    if (coordinates) {
        let axisX = +coordinates.dataset.originX;
        let axisY = +coordinates.dataset.originY;
        return [axisX, axisY]
    } else {
        let axisX = 0;
        let axisY = 0;
        return [axisX, axisY]
    }
}

function switchLevel(currentLevel) {
    const volumeButton = document.querySelector('.volumeButton');
    volumeButton.classList.remove('show-volumeButton');
    if (currentLevel == 3) {
        slideshow.createDivElement('level', 'thank-you');
        const thankYou = document.getElementById('thank-you');
        thankYou.innerHTML = '<h1>You have finished the game!<br><br>Thank you for playing!</h1>';
        slideshow.scrollToPosition($(document).height() - thankYou.clientHeight, 2000);
        volumeButton.style.color = 'darkcyan';
    } else if (currentLevel == 2) {
        let newLevel = +currentLevel + 1
        slideshow.createDivElement('level', `level-${newLevel}`);
        const gameArea = document.getElementById(`level-${newLevel}`);
        gameArea.innerHTML = `<h1>Level ${newLevel}</h1><p>by Doni</p><div id="display"></div>`;
        gameArea.children[2].innerHTML = levels.getLevelThree();
        slideshow.scrollToPosition($(document).height() - gameArea.clientHeight, 2000);
        volumeButton.style.color = 'white';
    } else if (currentLevel == 1) {
        let newLevel = +currentLevel + 1
        slideshow.createDivElement('level', `level-${newLevel}`);
        const gameArea = document.getElementById(`level-${newLevel}`);
        gameArea.innerHTML = `<h1>Level ${newLevel}</h1><p>by LatNat</p><div id="display"></div>`;
        gameArea.children[2].innerHTML = levels.getLevelTwo();
        slideshow.scrollToPosition($(document).height() - gameArea.clientHeight, 2000);
        volumeButton.style.color = 'white';
    } else {
        let newLevel = +currentLevel + 1
        slideshow.createDivElement('level', `level-${newLevel}`);
        const gameArea = document.getElementById(`level-${newLevel}`);
        gameArea.innerHTML = `<h1>Level ${newLevel}</h1><div id="display"></div>`;
        gameArea.children[1].innerHTML = levels.getLevelOne();
        slideshow.scrollToPosition($(document).height() - gameArea.clientHeight, 2000);
    }
    
    
    setTimeout(function () {
        slideshow.removeDivElement(`level-${currentLevel}`);
        initMovement();
        volumeButton.classList.add('show-volumeButton');
    }, 2000)
}


export function initLevelOne() {
    const html = document.querySelector('html');
    html.classList.add('init-game');
    const gameArea = document.getElementById('level-1');
    gameArea.innerHTML = '<h1>Level 1</h1><p>by Benedek</p><div id="display"></div>';
    gameArea.children[2].innerHTML = levels.getLevelOne();
}