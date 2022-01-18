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
        menu.appendChild(button);
    }
    document.body.appendChild(menu);
}
