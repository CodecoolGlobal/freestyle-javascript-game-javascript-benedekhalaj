class Level {
    constructor (axisX, axisY, tileType) {
        this.axisX = axisX,
        this.axisY = axisY,
        this.tileType = tileType
    }
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
}

export function createSaveButton() {
    let saveButton = document.createElement("button")
    saveButton.addEventListener("click", saveGameArea);
    saveButton.innerText = "save";
    document.body.appendChild(saveButton);
}

export function initEditorMenu() {
    const options = ["goal", "player", "obstacle"];
    let menu = document.createElement("div");
    menu.id = "editor-menu";
    for (let option of options) {
        let button = document.createElement("div");
        button.id = "button";
        button.className = option;
        button.addEventListener("click", (event) => {
            let choice = event.target;
            activateTile(choice.className);
        })
        menu.appendChild(button);
    }
    document.body.appendChild(menu);
}

function activateTile(chosenType) {
    let chosenTile = document.querySelector("input[type=hidden]");
    if (!chosenTile) {
        let userChoice = document.createElement("input");
        userChoice.type = "hidden";
        userChoice.value = chosenType;
        document.body.appendChild(userChoice);
    } else {
        chosenTile.remove();
        activateTile(chosenType);
    }
}

function addClassToTile(targetTile) {
    let userChoice = document.querySelector("input[type=hidden]");
    targetTile.classList.add(userChoice.value);
}

function removeClassFromTile(targetTile) {
    let userChoice = document.querySelector("input[type=hidden]");
    targetTile.classList.remove(userChoice.value);
}

export function addListenerForTile(tile) {
    tile.addEventListener("click", (event) => {
        let chosenTile = event.target;
        addClassToTile(chosenTile);
    })

    tile.addEventListener("contextmenu", (event) => {
        let chosenTile = event.target;
        event.preventDefault();
        removeClassFromTile(chosenTile);
    })
}
