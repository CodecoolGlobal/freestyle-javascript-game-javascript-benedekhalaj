import { getLevelOne, getLevelTwo } from "./levels.js";
import { initMovement } from "./game.js";

function setDirection(direction) {
    const arrowDirection = {
        "ArrowLeft": [0, -1],
        "ArrowRight": [0, 1],
        "ArrowUp": [-1, 0],
        "ArrowDown": [1, 0]
    }
    return arrowDirection[direction]
}

function checkWin(player) {
    return player.classList.contains("goal");
}

export function go(direction) {
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
        neighbour.classList.add("player");
        setTimeout(function () {
            go(direction, true);
        }, 35);
    } else {
        initMovement();
    }
}

function getOriginCoordinates() {
    let coordinates = document.getElementById("playerOrigin");
    console.log(coordinates);
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
    if (currentLevel == 3) {
        createDivElement('level', 'thank-you');
        const thankYou = document.getElementById('thank-you');
        thankYou.innerHTML = '<h1>You have finished the game!<br><br>Thank you for playing!</h1>';
        scrollToPosition($(document).height() - thankYou.clientHeight, 2000);
    } else if (currentLevel == 1) {
        let newLevel = +currentLevel + 1
        createDivElement('level', `level-${newLevel}`);
        const gameArea = document.getElementById(`level-${newLevel}`);
        gameArea.innerHTML = `<h1>Level ${newLevel}</h1><div id="display"></div>`;
        gameArea.children[1].innerHTML = getLevelTwo();
        scrollToPosition($(document).height() - gameArea.clientHeight, 2000);
    } else {
        let newLevel = +currentLevel + 1
        createDivElement('level', `level-${newLevel}`);
        const gameArea = document.getElementById(`level-${newLevel}`);
        gameArea.innerHTML = `<h1>Level ${newLevel}</h1><div id="display"></div>`;
        gameArea.children[1].innerHTML = getLevelOne();
        scrollToPosition($(document).height() - gameArea.clientHeight, 2000);
    }
    

    setTimeout(function () {
        removeDivElement(`level-${currentLevel}`);
        initMovement();
        createVolumeDiv();
    }, 2000)
}

function scrollToPosition(position, duration) {
    document.querySelector('html').style.scrollSnapType = 'none';

    $('html, body').animate({
        scrollTop: position
    }, duration, function(){
    });

    setTimeout(function () {
        document.querySelector('html').style.scrollSnapType = 'y mandatory';
    }, duration)
}


function createDivElement(className, id) {
    let div = document.createElement('div');
    div.id = id;
    div.className = className;
    document.body.appendChild(div);
}

function removeDivElement(id) {
    const div = document.getElementById(id);
    div.remove();
}


function createVolumeDiv() {
    let volumeDiv = document.createElement('div');
    volumeDiv.className = 'volumeButton';
    volumeDiv.innerHTML = `<i class="fas fa-volume-mute"></i>
    <i class="fas fa-volume-up"></i>`;
    const level = document.querySelector('.level');
    level.insertBefore(volumeDiv, level.firstChild);
}