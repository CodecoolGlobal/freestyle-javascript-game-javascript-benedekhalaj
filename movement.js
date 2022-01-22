import { getLevelOne, getLevelTwo, getLevelThree } from "./levels.js";
import { initMovement } from "./game.js";
import { addRotateEventListener, getOrientation } from "./map_editor.js";


function setDirection(direction) {
    const orientation = getOrientation();
    const arrowDirection = convertDirection(orientation);
    return arrowDirection[direction]
}

function convertDirection(orientation) {
    const realignedDirection = {
        "north": {
            "ArrowLeft": [0, -1],
            "ArrowRight": [0, 1],
            "ArrowUp": [-1, 0],
            "ArrowDown": [1, 0]
        },
        "east": {
            "ArrowLeft": [1, 0],
            "ArrowRight": [-1, 0],
            "ArrowUp": [0, -1],
            "ArrowDown": [0, 1]
        },
        "west": {
            "ArrowLeft": [-1, 0],
            "ArrowRight": [1, 0],
            "ArrowUp": [0, 1],
            "ArrowDown": [0, -1]
        }
    }
    return realignedDirection[orientation]
}

function checkWin(player) {
    return player.classList.contains("goal");
}

export function go(direction, pitch) {
    console.log(pitch);
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
            addRotateEventListener();
        }, 400);
        
    } else if (!neighbour.classList.contains("obstacle")) {
        player.classList.remove("player");
        let stepSound = getStepSound(pitch);
        stepSound.play();
        neighbour.classList.add("player");
        setTimeout(function () {
            go(direction, pitch+1);
        }, 35);
    } else {
        initMovement();
        addRotateEventListener();
    }
}

export function getOriginCoordinates() {
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
    const volumeButton = document.querySelector('.volumeButton');
    volumeButton.classList.remove('show-volumeButton');
    if (currentLevel == 3) {
        createDivElement('level', 'thank-you');
        const thankYou = document.getElementById('thank-you');
        thankYou.innerHTML = '<h1>You have finished the game!<br><br>Thank you for playing!</h1>';
        scrollToPosition($(document).height() - thankYou.clientHeight, 2000);
        volumeButton.style.color = 'darkcyan';
    } else if (currentLevel == 2) {
        let newLevel = +currentLevel + 1
        createDivElement('level', `level-${newLevel}`);
        const gameArea = document.getElementById(`level-${newLevel}`);
        gameArea.innerHTML = `<h1>Level ${newLevel}</h1><p>by Doni</p><div id="display"></div>`;
        gameArea.children[2].innerHTML = getLevelThree();
        scrollToPosition($(document).height() - gameArea.clientHeight, 2000);
        volumeButton.style.color = 'white';
    } else if (currentLevel == 1) {
        let newLevel = +currentLevel + 1
        createDivElement('level', `level-${newLevel}`);
        const gameArea = document.getElementById(`level-${newLevel}`);
        gameArea.innerHTML = `<h1>Level ${newLevel}</h1><p>by LatNat</p><div id="display"></div>`;
        gameArea.children[2].innerHTML = getLevelTwo();
        scrollToPosition($(document).height() - gameArea.clientHeight, 2000);
        volumeButton.style.color = 'white';
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
        volumeButton.classList.add('show-volumeButton');
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

function getStepSound(pitch) {
    console.log(pitch);
    const stepSoundBank = {
        "1": new Audio("audio/soundFX/pitch_1.ogg"),
        "2": new Audio("audio/soundFX/pitch_2.ogg"),
        "3": new Audio("audio/soundFX/pitch_3.ogg"),
        "4": new Audio("audio/soundFX/pitch_4.ogg"),
        "5": new Audio("audio/soundFX/pitch_5.ogg"),
        "6": new Audio("audio/soundFX/pitch_6.ogg"),
        "7": new Audio("audio/soundFX/pitch_7.ogg"),
        "8": new Audio("audio/soundFX/pitch_8.ogg"),
        "9": new Audio("audio/soundFX/pitch_9.ogg"),
        "10": new Audio("audio/soundFX/pitch_10.ogg"),
        "11": new Audio("audio/soundFX/pitch_11.ogg"),
    }
    console.log(stepSoundBank[String(pitch)])
    return stepSoundBank[String(pitch)]
}
