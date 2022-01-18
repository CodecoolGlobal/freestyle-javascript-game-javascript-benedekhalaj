const AXIS_X_START = 0;
const AXIS_Y_START = 0;
const playerIcon = "fa-angry fa-2x"


function setDirection(direction) {
    const arrowDirection = {
        "ArrowLeft": [0, -1],
        "ArrowRight": [0, 1],
        "ArrowUp": [-1, 0],
        "ArrowDown": [1, 0]
    }
    return arrowDirection[direction]
}


export function go(direction) {
    let [directionRow, directionCol] = setDirection(direction);
    let player = document.querySelector(".player");
    let playerColumn = Number(player.dataset.column);
    let playerRow = Number(player.dataset.row);
    let neighbour = document.querySelector(`[data-row="${playerRow + directionRow}"][data-column="${playerColumn + directionCol}"]`);
    if (neighbour === null) {
        player.classList.remove("player", `${playerIcon}`);
        let startingPoint = document.querySelector(`[data-row="${AXIS_Y_START}"][data-column="${AXIS_X_START}"]`);
        startingPoint.classList.add("player", `${playerIcon}`);
    } else if (!neighbour.classList.contains("obstacle")) {
        player.classList.remove("player", `${playerIcon}`);
        neighbour.classList.add("player", `${playerIcon}`);
        go(direction);
    }
}
