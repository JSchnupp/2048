// global vars
var gameManager;
var aiInstance;
var inputManager;

// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  // start a new game
  gameManager = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  console.log("THis application is running.");

  // create AI instance
  aiInstance = new AI(gameManager.grid);
  console.log("GameManager GRID: " + gameManager.grid);

  // create KeyboardInputManager instance, call its methods to manipulate the board
  InputMgr = new KeyboardInputManager();

  console.log("Game is running. About to call AI for loop.");

  aiMove();

  //aiInstance.testAI();
});

// iterate through list of directions, or until 2048 is reached, or until game is lost
function aiMove() {
  currentMove = aiInstance.bestMove(); // conveniently, bestMove and InputManager use the same numbers to correspond to the same directions

  // calls listener for "move" with the direction needed
  InputMgr.emit("move", currentMove);

  if (!gameManager.isGameTerminated()) {
    setTimeout(aiMove, 500);
  }
}