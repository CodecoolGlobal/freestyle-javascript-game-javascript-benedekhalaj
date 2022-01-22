import * as levels from "./levels.js";
import * as sound from "./sound.js";
import * as slideshow from "./slideshow.js";


export function initMovement() {
    document.addEventListener('keydown', startMovement
    );
}

export function initGame() {
    const html = document.querySelector('html');
    html.classList.add('init-game');
    switchLevel(0);
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


function setLevel(level) {
    const gameLevels = {
        1: levels.getLevelOne(),
        2: levels.getLevelTwo(),
        3: levels.getLevelThree()
    }
    return gameLevels[level];
}

function setLevelHeader(level) {
    const levelHeaders = {
        1: 'by Benedek',
        2: 'by Latnat',
        3: 'by Doni'
    }
    return levelHeaders[level];
}


function setVolumeButtonColor(level) {
    const colors = {
        1: 'darkcyan',
        2: 'white',
        3: 'white',
        4: 'darkcyan'
    }
    return colors[level];
}


function switchLevel(currentLevel) {
    const volumeButton = document.querySelector('.volumeButton');
    volumeButton.classList.remove('show-volumeButton');
    let nextLevel = +currentLevel + 1
    slideshow.createDivElement('level', `level-${nextLevel}`);
    const gameArea = document.getElementById(`level-${nextLevel}`);

    if (nextLevel < 4) {
        gameArea.innerHTML = `<h1>Level ${nextLevel}</h1><p>${setLevelHeader(nextLevel)}</p><div id="display"></div>`;
        gameArea.children[2].innerHTML = setLevel(nextLevel);
    } else {
        gameArea.innerHTML = '<h1>You have finished the game!<br><br>Thank you for playing!</h1>';
    }

    slideshow.scrollToPosition($(document).height() - gameArea.clientHeight, 2000);
    volumeButton.style.color = setVolumeButtonColor(nextLevel);

    
    setTimeout(function () {
        initMovement();
        volumeButton.classList.add('show-volumeButton');
        slideshow.removeDivElement(`level-${currentLevel}`);
    }, 2000)
}
