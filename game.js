import * as movement from "./movement.js"
import { createSaveButton, initEditorMenu, addListenerForTile } from "./map_editor.js"


const GAME_AREA_HEIGHT = 15;
const GAME_AREA_WIDTH = 30;


function createElement(classOfElement) {
    let newDiv = document.createElement("div");
    newDiv.className = "tile fas";
    addListenerForTile(newDiv);
    classOfElement ? newDiv.classList.add(classOfElement) : {/*pass*/};
    return newDiv
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
                let newTile = createElement();
                newTile.dataset.row = i;
                newTile.dataset.column = j;
                newRow.appendChild(newTile);
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
createSaveButton();
initEditorMenu();
