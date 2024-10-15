// Jordyn Schnupp
// J00688738 

// Random-based AI that selects a move randomly
RandomAI = function (game) {
    this.currentGame = game;
  };
  
  // Determine the next move randomly, ensuring it's a valid move
  RandomAI.prototype.nextMove = function() {
    let move;
    do {
      move = Math.floor(Math.random() * 4); // Randomly select a direction (0 to 3)
    } while (!this.currentGame.moveAvailable(move)); // Repeat until a valid move is found
    return move;
  };
  
  // Priority-based AI that chooses moves based on a fixed priority order
  PriorityBasedAI = function (game) {
    this.currentGame = game;
  };
  
  // Decide the next move by following the priority: up, left, right, down
  PriorityBasedAI.prototype.nextMove = function() {
    const priorityOrder = [0, 3, 1, 2]; // Priority directions: up, left, right, down
    let move;
    
    for (let i = 0; i < priorityOrder.length; i++) {
      move = priorityOrder[i];
      if (this.currentGame.moveAvailable(move)) {
        return move; // Return the first valid move based on priority
      }
    }
    
    return 0; // Default to 'up' if no other valid moves are found
  };
  
  // Algorithm-based AI with a more structured pattern
  AlgorithmicAI = function (game) {
    this.currentGame = game;
  };
  
  AlgorithmicAI.prototype.previousMove = -1;
  
  // Determine the next move using a specific algorithmic pattern
  AlgorithmicAI.prototype.nextMove = function() {
    let move = 0; // Start with the 'up' direction
    
    // Alternate moves if the previous one was the same direction
    if (move === this.previousMove) {
      move = 3; // Switch to 'left' if the previous was 'up'
    }
  
    // Check if the chosen move is valid
    if (!this.currentGame.moveAvailable(move)) {
      // Fall back to priority moves if the initial choice isn't valid
      const priorityFallback = [0, 3, 1, 2];
      
      for (let i = 0; i < priorityFallback.length; i++) {
        move = priorityFallback[i];
        if (this.currentGame.moveAvailable(move)) {
          break; // Use the first available move based on the priority
        }
      }
    }
  
    this.previousMove = move; // Store the last move made
    return move;
  };
  