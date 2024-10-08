// cody shamback
// j00708396

// FUNCTIONS TO MOVE SHIT IN ARRAY ----

// remove abstraction
// each of the following 4 functions shifts a given character one space in a given direction
function shiftUp(arr, row, col) {
    newArr = structuredClone(arr); // deep copy so we don't overwrite shit we shouldn't 
    if (arr[row][col] === 0 || row > 3 || col > 3) return newArr; // if the square is empty or OBE, do nothing 

    currentNum = newArr[row][col]; // get current number to be moved

    // check that below space exists
    if (row != 0) {

        aboveNum = arr[row - 1][col]; // get number to bump into 

        if (aboveNum === currentNum) { // if the two numbers colliding are the same, add them. 
            newArr[row][col] = 0;
            newArr[row - 1][col] = currentNum * 2;

        } else if (aboveNum === 0) { // above space is empty - just fill the space
            newArr[row][col] = 0;
            newArr[row - 1][col] = currentNum;

        } else { // above space is not empty and also not equal to currentNum. do nothing 
            return newArr;
        }

    }

    return newArr;
}


function shiftDown(arr, row, col) {

    newArr = structuredClone(arr); // deep copy so we don't overwrite shit we shouldn't 
    if (arr[row][col] === 0 || row > 3 || col > 3) return newArr; // if the square is empty or OBE, do nothing 

    currentNum = newArr[row][col]; // get current number to be moved

    // check that below space exists
    if (row != 3) {

        belowNum = arr[row + 1][col]; // get number to bump into 

        if (belowNum === currentNum) { // if the two numbers colliding are the same, add them. 
            newArr[row][col] = 0;
            newArr[row + 1][col] = currentNum * 2;

        } else if (belowNum === 0) { // above space is empty - just fill the space
            newArr[row][col] = 0;
            newArr[row + 1][col] = currentNum;

        } else { // above space is not empty and also not equal to currentNum. do nothing 
            return newArr;
        }

    }

    return newArr;
}

function shiftLeft(arr, row, col) {

    newArr = structuredClone(arr); // deep copy so we don't overwrite shit we shouldn't 
    if (arr[row][col] === 0 || row > 3 || col > 3) return newArr; // if the square is empty or OBE, do nothing 

    currentNum = newArr[row][col]; // get current number to be moved

    // check that left space exists
    if (col != 0) {

        leftNum = arr[row][col - 1]; // get number to bump into 

        if (leftNum === currentNum) { // if the two numbers colliding are the same, add them. 
            newArr[row][col] = 0;
            newArr[row][col - 1] = currentNum * 2;

        } else if (leftNum === 0) { // above space is empty - just fill the space
            newArr[row][col] = 0;
            newArr[row][col - 1] = currentNum;

        } else { // above space is not empty and also not equal to currentNum. do nothing 
            return newArr;
        }

    }

    return newArr;
}

function shiftRight(arr, row, col) {

    newArr = structuredClone(arr); // deep copy so we don't overwrite shit we shouldn't 
    if (arr[row][col] === 0 || row > 3 || col > 3) return newArr; // if the square is empty or OBE, do nothing 

    currentNum = newArr[row][col]; // get current number to be moved

    // check that right space exists
    if (col != 3) {

        rightNum = arr[row][col + 1]; // get number to bump into 

        if (rightNum === currentNum) { // if the two numbers colliding are the same, add them. 
            newArr[row][col] = 0;
            newArr[row][col + 1] = currentNum * 2;

        } else if (rightNum === 0) { // above space is empty - just fill the space
            newArr[row][col] = 0;
            newArr[row][col + 1] = currentNum;

        } else { // above space is not empty and also not equal to currentNum. do nothing 
            return newArr;
        }

    }

    return newArr;
}

// shifts all numbers in the array in any given direction. 
// plug in any of thr 4 directional shift functions (above): shiftUp(), shiftDown()... 
function shiftAllTheWay(arr, shiftFunction) {
    newArr = structuredClone(arr); // don't overwrite shit. bad. 

    // outer for loop moves everything in the chosen direction a max of 4 times to make sure it goes all the way in that direction 
    // move each cell in "turns" so that things collide in a fair order 
    for (m = 0; m < 4; m++) {

        // the following nested for loops iterate through every cell in the 2d array ONCE. 
        for (i = 0; i < arr.length; i++) {
            for (j = 0; j < arr[i].length; j++) {
                arr = shiftFunction(arr, i, j);
            }
        }
    }

    return newArr;
}

// prints 2d arr so that it looks like the 2048 board
function printInLine(arr) {
    // size of 2048 board is always 4x4, so length is hardcoded <3
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