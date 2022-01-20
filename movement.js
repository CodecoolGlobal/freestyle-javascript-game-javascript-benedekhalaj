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
        console.log("you've won");
    } else if (neighbour === null) {
        player.classList.remove("player");
        let startingPoint = document.querySelector(`[data-row="${axisX}"][data-column="${axisY}"]`);
        startingPoint.classList.add("player");
        initMovement();
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