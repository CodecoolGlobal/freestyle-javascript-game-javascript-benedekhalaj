class Level {
    constructor (axisX, axisY, tileType) {
        this.axisX = axisX,
        this.axisY = axisY,
        this.tileType = tileType
    }
}


function saveMap() {
    let axisX = [];
    let axisY = [];
    let tileType = [];
    const displayArea = document.getElementById("display");
    for (let tile of displayArea) {
        axisX.push(tile.dataset.row);
        axisY.push(tile.dataset.column);
        tileType.push(tile.className);
    }
    const level = new Level(axisX, axisY, tileType);
    console.log(level);
}