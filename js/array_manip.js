// cody shamback
// j00708396

// Functions to shift numbers in array

function shiftUp(arr, row, col) {
    newArr = structuredClone(arr);
    if (arr[row][col] === 0 || row > 3 || col > 3) return newArr;

    currentNum = newArr[row][col];
    if (row != 0) {
        aboveNum = arr[row - 1][col];
        if (aboveNum === currentNum) {
            newArr[row][col] = 0;
            newArr[row - 1][col] = currentNum * 2;
        } else if (aboveNum === 0) {
            newArr[row][col] = 0;
            newArr[row - 1][col] = currentNum;
        }
    }
    return newArr;
}

function shiftDown(arr, row, col) {
    newArr = structuredClone(arr);
    if (arr[row][col] === 0 || row > 3 || col > 3) return newArr;

    currentNum = newArr[row][col];
    if (row != 3) {
        belowNum = arr[row + 1][col];
        if (belowNum === currentNum) {
            newArr[row][col] = 0;
            newArr[row + 1][col] = currentNum * 2;
        } else if (belowNum === 0) {
            newArr[row][col] = 0;
            newArr[row + 1][col] = currentNum;
        }
    }
    return newArr;
}

function shiftLeft(arr, row, col) {
    newArr = structuredClone(arr);
    if (arr[row][col] === 0 || row > 3 || col > 3) return newArr;

    currentNum = newArr[row][col];
    if (col != 0) {
        leftNum = arr[row][col - 1];
        if (leftNum === currentNum) {
            newArr[row][col] = 0;
            newArr[row][col - 1] = currentNum * 2;
        } else if (leftNum === 0) {
            newArr[row][col] = 0;
            newArr[row][col - 1] = currentNum;
        }
    }
    return newArr;
}

function shiftRight(arr, row, col) {
    newArr = structuredClone(arr);
    if (arr[row][col] === 0 || row > 3 || col > 3) return newArr;

    currentNum = newArr[row][col];
    if (col != 3) {
        rightNum = arr[row][col + 1];
        if (rightNum === currentNum) {
            newArr[row][col] = 0;
            newArr[row][col + 1] = currentNum * 2;
        } else if (rightNum === 0) {
            newArr[row][col] = 0;
            newArr[row][col + 1] = currentNum;
        }
    }
    return newArr;
}

function shiftAllTheWay(arr, shiftFunction) {
    newArr = structuredClone(arr);
    for (m = 0; m < 4; m++) {
        for (i = 0; i < arr.length; i++) {
            for (j = 0; j < arr[i].length; j++) {
                arr = shiftFunction(arr, i, j);
            }
        }
    }
    return newArr;
}

function printInLine(arr) {
    for (let i = 0; i < 4; i++) {
        console.log(arr[i]);
    }
    console.log("\n");
}

/* SAMPLE CODE TO SHOW HOW ARRAY SHIFT WORKS FOR ALL DIRECTIONS ---------------------------------------------------------
// CREATE DEFAULT ARRAY ----
arr = [];
newArr = [];
const size = 4; // rows always = cols

// initialize blank
for (let i = 0; i < size; i++) {
    arr[i] = []; // create new row

    for (let k = 0; k < size; k++) { // fill that row
        arr[i][k] = 0;
    }
}

// add 2 values - eventually will grab position/value from game board
// can add any vals you like here as long as they're between [0][0] and [3][3]
// currently no check exists for 2048. i'm lazy 
arr[0][0] = 2;
arr[1][2] = 2;
arr[3][3] = 4;
arr[3][2] = 4;

printInLine(arr);
console.log(arr);

// FUNCTION CALLS ----
console.log("UP");
newArr = shiftAllTheWay(arr, shiftUp);
printInLine(newArr);

console.log("DOWN");
newArr = shiftAllTheWay(arr, shiftDown);
printInLine(newArr);

console.log("LEFT");
newArr = shiftAllTheWay(arr, shiftLeft);
printInLine(newArr);

console.log("RIGHT");
newArr = shiftAllTheWay(arr, shiftRight);
printInLine(newArr);
*/

