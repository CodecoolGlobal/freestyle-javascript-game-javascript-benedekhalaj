import * as movement from "./recursivemovement.js"

const GAME_AREA_HEIGHT = 10;
const GAME_AREA_WIDTH = 20;


function createElement(classOfElement) {
    if (classOfElement === "player") {
        let newDiv = document.createElement("div");
        newDiv.className = "tile player fas fa-angry";
        return newDiv
    } else {
    let newDiv = document.createElement("div");
    newDiv.className = "tile fas";
    classOfElement ? newDiv.classList.add(classOfElement) : {/*pass*/};
    return newDiv
    }
}

function addRow() {
    const display = document.getElementById("display");
    const newRow = document.createElement("div");
    newRow.className = "row";
    display.appendChild(newRow);
    return newRow
}

function createTable() {
    for (let i = 0; i < GAME_AREA_HEIGHT; i++) {
        let newRow = addRow();
        for (let j = 0; j < GAME_AREA_WIDTH; j++) {
            if (i === 0 && j === 0) {
                let newTile = createElement("player");
                newTile.dataset.row = i;
                newTile.dataset.column = j;
                newRow.appendChild(newTile);
            } else {
                let newTile = createElement();
                newTile.dataset.row = i;
                newTile.dataset.column = j;
                newRow.appendChild(newTile);
            }
        }
    }
}

function initMovement() {
    document.addEventListener('keydown', function(event) {
        movement.go(event.key)
    });
}



createTable();
initMovement();