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

function createSaveButton() {
    let saveButton = createButtonFor("Save map");
    saveButton.className = "save-button"
    saveButton.addEventListener("click", saveGameArea);
    return saveButton
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
    menu.appendChild(saveMapButton);
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

export function addListenerForTile(tile) {
    tile.addEventListener("click", (event) => {
        let chosenTile = event.target;
        addClassToTile(chosenTile);
    })
}
