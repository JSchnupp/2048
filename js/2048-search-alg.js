// Jordyn Schnupp
// J00688738

// AI Algorithm for 2048 
function AI(grid) {
  this.grid = grid; // game grid reference
}

// Evaluate all possible moves and return the best one
AI.prototype.bestMove = function () {
  const moves = [0, 1, 2, 3]; // 0: Up, 1: Right, 2: Down, 3: Left
  let bestScore = -Infinity;
  let bestMove = null;

  // Evaluate each move
  moves.forEach(move => {
    const gridCopy = structuredClone(this.grid); // Make a deep copy of the current grid
    const score = this.simulateMove(gridCopy, move); // Simulate the move

    if (score > bestScore) {
      bestScore = score; // Update the best score
      bestMove = move; // Update the best move
    }
  });

  return bestMove; // Return the best move found
};

// Simulate a move and return the resulting score
AI.prototype.simulateMove = function (grid, direction) {
  let score = 0;
  let moved = false;

  // Handle the move based on the direction
  switch (direction) {
    case 0: // Up
      for (let x = 0; x < grid.size; x++) {
        for (let y = 1; y < grid.size; y++) {
          const tile = grid.cells[x][y];
          if (tile) {
            const target = grid.cells[x][y - 1];
            if (!target || (target.value === tile.value)) {
              if (target) {
                grid.removeTile(target); // Remove the target tile
                score += target.value; // Add to score
                tile.savePosition(); // Save position before moving
                tile.updatePosition({ x: x, y: y - 1 }); // Move the tile
                moved = true;
              } else {
                tile.savePosition(); // Save position before moving
                tile.updatePosition({ x: x, y: y - 1 }); // Move the tile
                moved = true;
              }
            }
          }
        }
      }
      break;

    // Similar logic for Right (1), Down (2), and Left (3) directions

    // Add logic for right, down, and left similarly...
  }

  // If any tiles moved, add the new score
  if (moved) {
    const availableCell = grid.randomAvailableCell();
    if (availableCell) {
      const newTile = new Tile(availableCell, 2); // Add a new tile with value 2
      grid.insertTile(newTile); // Insert the new tile
    }
  }

  return score; // Return the total score after the move
};

// Examples for testing!!!!
AI.prototype.testAI = function () {
  const gridSize = 4;
  const grid = new Grid(gridSize, null); // Initialize a new grid
  const ai = new AI(grid); // Create an instance of the AI

  // Manually set up the grid state for testing
  grid.cells[0][0] = new Tile({ x: 0, y: 0 }, 2);
  grid.cells[0][1] = new Tile({ x: 0, y: 1 }, 2);
  grid.cells[1][0] = new Tile({ x: 1, y: 0 }, 2);
  grid.cells[1][1] = new Tile({ x: 1, y: 1 }, 4);

  console.log("Current Grid State:");
  console.log(grid.cells);

  // Get the best move from the AI
  const bestMove = ai.bestMove();
  console.log("Best Move:", bestMove); // Output the best move

  // Simulate the best move and get the resulting score
  const resultingScore = ai.simulateMove(grid, bestMove);
  console.log("Resulting Score:", resultingScore); // Output the resulting score

  // Display the updated grid state
  console.log("Updated Grid State:");
  console.log(grid.cells);
}