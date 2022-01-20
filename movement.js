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
    let [directionRow, directionCol] = setDirection(direction);
    let player = document.querySelector(".player");
    let playerColumn = Number(player.dataset.column);
    let playerRow = Number(player.dataset.row);
    let neighbour = document.querySelector(`[data-row="${playerRow + directionRow}"][data-column="${playerColumn + directionCol}"]`);
    if (checkWin(player)) {
        console.log("you've won");
    } else if (neighbour === null) {
        player.classList.remove("player");
        let axisX, axisY = getOriginCoordinates();
        let startingPoint = document.querySelector(`[data-row="${axisY}"][data-column="${axisX}"]`);
        startingPoint.classList.add("player");
    } else if (!neighbour.classList.contains("obstacle")) {
        player.classList.remove("player");
        neighbour.classList.add("player");
        go(direction);
    }
}

function getOriginCoordinates() {
    const coordinates = document.querySelector("#player-origin");
    console.log(coordinates);
    let axisX = coordinates.dataset.axisX;
    console.log(axisX);
    let axisY = coordinates.dataset.axisY;
    console.log(axisY);
    return [axisX, axisY]
}