import { getLevelOne } from "./levels.js";

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
        }, 400);
        
        setTimeout(() => switchLevel(currentLevel.id.slice(-1)), 2000);

    } else if (neighbour === null) {
        player.classList.remove("player");
        let startingPoint = document.querySelector(`[data-row="${axisX}"][data-column="${axisY}"]`);
        startingPoint.classList.add("player");
    } else if (!neighbour.classList.contains("obstacle")) {
        player.classList.remove("player");
        neighbour.classList.add("player");
        go(direction);
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
    console.log(currentLevel);
    let newLevel = +currentLevel + 1
    createDivElement('level', `level-${newLevel}`);
    const gameArea = document.getElementById(`level-${newLevel}`);
    gameArea.innerHTML = `<h1>Level ${newLevel}</h1><div id="display"></div>`;
    gameArea.children[1].innerHTML = getLevelOne();
    scrollToPosition($(document).height() - gameArea.clientHeight, 2000);

    setTimeout(function () {
        removeDivElement(`level-${currentLevel}`);
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
