import * as game from "./game.js";


const GAME_AREA_HEIGHT = 12;
const GAME_AREA_WIDTH = 12;


function Level(tiles, playerOrigin) {
    this.tiles = tiles,
    this.playerOrigin = playerOrigin
}

function Tile(row, col, type) {
    this.row = row,
    this.col = col,
    this. type = type
}

let testLevel = {};

function createTable() {
    const display = document.getElementById("display");
    for (let i = 0; i < GAME_AREA_HEIGHT; i++) {
        for (let j = 0; j < GAME_AREA_WIDTH; j++) {
            let newTile = createElement();
            newTile.dataset.row = i;
            newTile.dataset.column = j;
            display.appendChild(newTile);
        }
    }
}

function deleteTable() {
    const display = document.getElementById("display");
    while (display.firstChild) {
        display.removeChild(display.lastChild);
    }
}

function createElement(classOfElement) {
    let newDiv = document.createElement("div");
    addListenerForTile(newDiv);
    classOfElement ? newDiv.classList.add(classOfElement) : {/*pass*/};
    return newDiv
}

function saveGameArea() {
    let textArea = document.querySelector("textarea");
    let tileNodes = document.querySelectorAll("#display > div");   /* find selector */
    testLevel = convertGameAreaToArray(tileNodes);
    console.log(testLevel);
}

function convertGameAreaToArray(tileNodes) {
    const tilesArray = []
    for (let tile of tileNodes) {
        let row = tile.dataset.row;
        let col = tile.dataset.column;
        let type = tile.className || 'empty';
        let currentTile = new Tile(row, col, type);
        tilesArray.push(currentTile);
    }
    let originElement = document.getElementById("playerOrigin");
    let playerOrigin = [originElement.dataset.originX, originElement.dataset.originY];
    const level = new Level(tilesArray, playerOrigin);
    return level
}

function createSaveButton() {
    let saveButton = createButtonFor("save map");
    saveButton.className = "save"
    saveButton.addEventListener("click", saveGameArea);
    return saveButton
}

function createCopyButton() {
    let copyButton = createButtonFor("copy map");
    copyButton.className = "copy"
    copyButton.addEventListener("click", copyToClipboard);
    return copyButton
}

function createLoadMapButton() {
    let loadButton = createButtonFor("load map");
    loadButton.className = "load-map";
    loadButton.addEventListener("click", (e) => {
        loadLevel(testLevel)
    });
    return loadButton
}

function createGenerateMapButton() {
    let generateButton = createButtonFor("new map");
    generateButton.className = "generate-map";
    generateButton.addEventListener("click", (e) => {
        deleteTable();
        createTable();
    });
    return generateButton
}

function createSetOriginButton() {
    let setOriginButton = createButtonFor("set origin");
    setOriginButton.className = "set-origin";
    setOriginButton.addEventListener("click", (e) => {
        saveOrigin();
    });
    return setOriginButton
}

function createButtonFor(buttonText) {
    let button = document.createElement("div");
    button.id = "button";
    button.innerText = buttonText;
    return button
}

function initEditorMenu() {
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
    let copyMapHtmlButton = createCopyButton();
    let setOriginButton = createSetOriginButton();
    let loadMapButton = createLoadMapButton();
    menu.appendChild(copyMapHtmlButton);
    menu.appendChild(saveMapButton);
    menu.appendChild(generateMapButton);
    menu.appendChild(setOriginButton);
    menu.appendChild(loadMapButton);
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
            targetTile.classList.add(userChoice.value);
        } else {
            alert("in your dreams");
        }
    } else {
        targetTile.classList.add(userChoice.value);
    }
}


function removeClassFromTile(targetTile) {
    let userChoice = document.querySelector("input[type=hidden]");
    targetTile.classList.remove(userChoice.value);
}

function checkIfUniqueTileExists(tileType) {
    return (document.querySelectorAll(`.${tileType}`))
}

function addListenerForTile(tile) {
    tile.addEventListener("click", (event) => {
        let chosenTile = event.target;
        addClassToTile(chosenTile);
    })

    tile.addEventListener("contextmenu", (event) => {
        let chosenTile = event.target;
        event.preventDefault();
        removeClassFromTile(chosenTile);
    })

    tile.addEventListener("mouseover", (event) => {
        let chosenTile = event.target;
        if (event.ctrlKey) {
            addClassToTile(chosenTile);
        } else if (event.shiftKey) {
            removeClassFromTile(chosenTile);
        }
    })
}

function copyToClipboard() {
    let generatedMapHtml = document.getElementById("map-html");
    generatedMapHtml.select();
    navigator.clipboard.writeText(generatedMapHtml.value);
    alert("copied map html");
}

function saveOrigin() {
    let player = document.querySelector(".player");
    let coordinates = [player.dataset.row, player.dataset.column];
    let playerOrigin = document.createElement("input");
    let display = document.getElementById("display");
    playerOrigin.type = "hidden";
    playerOrigin.id = "playerOrigin";
    playerOrigin.dataset.originX = coordinates[0];
    playerOrigin.dataset.originY = coordinates[1];
    display.appendChild(playerOrigin);
}

function loadLevel(level) {
    deleteTable();
    let displayArea = document.getElementById("display");
    for (let tile of level.tiles) {
        let tileDiv = document.createElement("div");
        tileDiv.dataset.row = tile.row;
        tileDiv.dataset.column = tile.col;
        tileDiv.className = tile.type;
        displayArea.appendChild(tileDiv);
    }
}

createTable();
initEditorMenu();
game.initMovement();
