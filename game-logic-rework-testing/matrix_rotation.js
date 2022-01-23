const testMatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const testFlatMatrix = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'];

function createNegativeIndexingForArray(array) {
    const proxy = new Proxy(array, {
        get(target, prop) {
            if (!isNaN(prop)) {
                prop = parseInt(prop, 10);
                if (prop < 0) {
                    prop += target.length;
                }
            }        return target[prop];
        }
    });
    return proxy
}

function createTwoDimensionalMatrix(flatMatrix, elementPerRow) {
    let newMatrix = [];
    let row = [];
    for (let element of flatMatrix) {
        row.push(element);
        if (row.length === elementPerRow) {
            newMatrix.push(row)
            row = [];
        }
    }
    return newMatrix
}

function flattenMatrix(matrix) {
    let flatMatrix = []
    matrix.forEach(array => {
        array.forEach(element => {
            flatMatrix.push(element)
        });
    });
    return flatMatrix
}

function displayTwoDimensionalMatrix(matrix) {
    matrix.forEach(array => {
        let line = document.createElement("p");
        line.innerText = array;
        document.body.appendChild(line);        
    });
}

function flipMatrix(matrix) {
    matrix.forEach(array => array.reverse());
    return matrix.reverse()
}

function rotateMatrixRight(flippedMatrix) {
    let newMatrix = [];
    for (let i = flippedMatrix.length-1; i > -1; i--) {
        let newRow = [];
        for (let j = 0; j < flippedMatrix.length; j++) {
            newRow.push(flippedMatrix[j][i]);
        }
        newMatrix.push(newRow)
    }
    return newMatrix
}

function rotateFlatMatrixRight(flatMatrix, elementPerRow) {
    const proxy = createNegativeIndexingForArray(flatMatrix);
    let newMatrix = [];
    let step = elementPerRow;
    let startIndex = -step;
    while (startIndex < 0) {
        let index = startIndex;
        for (let j = 0; j < elementPerRow; j++) {
            newMatrix.push(proxy[index]);
            index -= step;
        }
        startIndex += 1
    }
    return newMatrix;
}

function rotateFlatMatrixLeft(flatMatrix, elementPerRow) {
    const proxy = createNegativeIndexingForArray(flatMatrix);
    let newMatrix = [];
    let step = elementPerRow;
    let startIndex = step-1;
    while (newMatrix.length < flatMatrix.length) {
        let index = startIndex;
        for (let j = 0; j < elementPerRow; j++) {
            newMatrix.push(flatMatrix[index]);
            index += step;
        }
        startIndex -= 1;
    }
    return newMatrix;
}

function drawSeparator() {
    let separatorLine = document.createElement("p");
    separatorLine.innerText = "---------------";
    document.body.appendChild(separatorLine);
}
// let threeByThree = createTwoDimensionalMatrix(testFlatMatrix);
// displayTwoDimensionalMatrix(threeByThree);
// console.log(flattenMatrix(threeByThree));
// threeByThree = rotateMatrixRight(flipMatrix(threeByThree));
// displayTwoDimensionalMatrix(threeByThree);
// console.log(flattenMatrix(threeByThree));
// displayTwoDimensionalMatrix(createTwoDimensionalMatrix(rotateFlatMatrixRight(testFlatMatrix, 3)))
// displayTwoDimensionalMatrix(createTwoDimensionalMatrix(rotateFlatMatrixLeft(testFlatMatrix, 3)))

let originalMatrix = createTwoDimensionalMatrix(testFlatMatrix, 4);
displayTwoDimensionalMatrix(originalMatrix);
drawSeparator();
let matrixToRight = rotateFlatMatrixRight(testFlatMatrix, 4);
matrixToRight = createTwoDimensionalMatrix(matrixToRight, 4);
displayTwoDimensionalMatrix(matrixToRight);
drawSeparator();
let matrixToLeft = rotateFlatMatrixLeft(testFlatMatrix, 4);
matrixToLeft = createTwoDimensionalMatrix(matrixToLeft, 4);
displayTwoDimensionalMatrix(matrixToLeft);