const GAME_AREA_HEIGHT = 10;
const GAME_AREA_WIDTH = 10;


export function createTable() {
    const tileCount = GAME_AREA_HEIGHT * GAME_AREA_WIDTH;
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
    let textArea = document.querySelector("textarea")
    let display = document.getElementById("display");
    textArea.innerText = display.innerHTML;
}

function createSaveButton() {
    let saveButton = createButtonFor("save map");
    saveButton.className = "save"
    saveButton.addEventListener("click", saveGameArea);
    return saveButton
}

function createGenerateMapButton() {
    let generateButton = createButtonFor("new map");
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
