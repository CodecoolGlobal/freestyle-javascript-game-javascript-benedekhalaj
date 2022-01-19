const GAME_AREA_HEIGHT = 15;
const GAME_AREA_WIDTH = 30;

let levels = {}

class Level {
    constructor (axisX, axisY, tileType) {
        this.axisX = axisX,
        this.axisY = axisY,
        this.tileType = tileType
    }
}

export function createTable() {
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

function deleteTable() {
    const display = document.getElementById("display");
    while (display.firstChild) {
        display.removeChild(display.lastChild);
    }
}

function addRow() {
    const display = document.getElementById("display");
    const newRow = document.createElement("div");
    newRow.className = "row";
    display.appendChild(newRow);
    return newRow
}

function createElement(classOfElement) {
    let newDiv = document.createElement("div");
    newDiv.className = "tile fas";
    addListenerForTile(newDiv);
    classOfElement ? newDiv.classList.add(classOfElement) : {/*pass*/};
    return newDiv
}

function saveGameArea() {
    let axisX = [];
    let axisY = [];
    let tileType = [];
    let allTiles = document.querySelectorAll(".tile");
    console.log(allTiles);
    for (let tile of allTiles) {
        axisX.push(tile.dataset.row);
        axisY.push(tile.dataset.column);
        tileType.push(tile.className);
    }
    const level = new Level(axisX, axisY, tileType);
    console.log(level);
    levels.level1 = level;
    console.log(levels);
}

function createSaveButton() {
    let saveButton = createButtonFor("Save map");
    saveButton.className = "save"
    saveButton.addEventListener("click", saveGameArea);
    return saveButton
}

function createGenerateMapButton() {
    let generateButton = createButtonFor("Generate map");
    generateButton.className = "generate-map"
    generateButton.addEventListener("click", (e) => {
        deleteTable();
        createTable();
    });
    return generateButton
}

function createButtonFor(buttonText) {
    let button = document.createElement("div");
    button.id = "button";
    button.innerText = buttonText;
    return button
}

export function initEditorMenu() {
    const options = ["goal", "player", "obstacle"];
    let menu = document.createElement("div");
    menu.id = "editor-menu";
    for (let option of options) {
        let button = createButtonFor(option);
        button.addEventListener("click", (event) => {
            let choice = event.target;
            saveUserTileChoice(choice.innerText);
        })
        menu.appendChild(button);
    }
    let saveMapButton = createSaveButton();
    let generateMapButton = createGenerateMapButton();
    menu.appendChild(saveMapButton);
    menu.appendChild(generateMapButton);
    document.body.appendChild(menu);
}

function saveUserTileChoice(chosenType) {
    let chosenTile = document.querySelector("input[type=hidden]");
    if (!chosenTile) {
        let userChoice = document.createElement("input");
        userChoice.type = "hidden";
        userChoice.value = chosenType;
        document.body.appendChild(userChoice);
    } else {
        chosenTile.remove();
        saveUserTileChoice(chosenType);
    }
}

function addClassToTile(targetTile) {
    let userChoice = document.querySelector("input[type=hidden]");
    let uniqueTypes = ["player", "goal"];
    if (uniqueTypes.includes(userChoice.value)) {
        if (checkIfUniqueTileExists(userChoice.value).length === 0) {
            targetTile.classList.toggle(userChoice.value);
        } else {
            alert("in your dreams");
        }
    } else {
        targetTile.classList.toggle(userChoice.value);
    }

}

function checkIfUniqueTileExists(tileType) {
    return (document.querySelectorAll(`.${tileType}`))
}

function addListenerForTile(tile) {
    tile.addEventListener("click", (event) => {
        let chosenTile = event.target;
        addClassToTile(chosenTile);
    })
}
