// Jordyn Schnupp
// J00688738

// AIInputManager constructor to manage AI inputs and states
function AIInputManager() {
    this.events = {}; // Event listeners
    this.listen(); // Start listening for button presses
  }
  
  // Enumerations for different AI modes and speeds
  AiMode = { RNG: 0, PRIORITY: 1, ALGORITHM: 2, SMART: 3 };
  AiSpeed = { FULL: 0, FAST: 1, SLOW: 2 };
  
  // Default AI properties and settings
  AIInputManager.prototype.isAiRunning = false;
  AIInputManager.prototype.mode = AiMode.SMART; // Default AI mode
  AIInputManager.prototype.speed = AiSpeed.FAST; // Default AI speed
  AIInputManager.prototype.fastMoveInterval = 200; // Time interval for fast moves (ms)
  AIInputManager.prototype.slowMoveInterval = 750; // Time interval for slow moves (ms)
  AIInputManager.prototype.currentGame = null; // Game object reference
  AIInputManager.prototype.gameStats = []; // Statistics tracking
  AIInputManager.prototype.maxStateBufferSize = 10; // Buffer size for saved game states
  AIInputManager.prototype.previousStates = []; // Storage for previous game states
  
  // Add an event listener for a specific event
  AIInputManager.prototype.on = function (event, callback) {
    if (!this.events[event]) {
      this.events[event] = []; // Create a new event array if it doesn't exist
    }
    this.events[event].push(callback);
  };
  
  // Emit an event and trigger its callbacks
  AIInputManager.prototype.emit = function (event, data) {
    const callbacks = this.events[event];
    if (callbacks) {
      callbacks.forEach(function (callback) {
        callback(data);
      });
    }
  };
  
  // Initialize button press event listeners for various controls
  AIInputManager.prototype.listen = function () {
    // Bind buttons to their respective actions
    this.bindButtonPress(".retry-button", this.restart);
    this.bindButtonPress(".pause-button", this.pauseOrResume);
    this.bindButtonPress(".smart-ai-button", () => { this.setAIMode(AiMode.SMART); });
    this.bindButtonPress(".algorithm-ai-button", () => { this.setAIMode(AiMode.ALGORITHM); });
    this.bindButtonPress(".priority-ai-button", () => { this.setAIMode(AiMode.PRIORITY); });
    this.bindButtonPress(".rng-ai-button", () => { this.setAIMode(AiMode.RNG); });
    this.bindButtonPress(".full-speed-button", () => { this.setAISpeed(AiSpeed.FULL); });
    this.bindButtonPress(".fast-speed-button", () => { this.setAISpeed(AiSpeed.FAST); });
    this.bindButtonPress(".slow-speed-button", () => { this.setAISpeed(AiSpeed.SLOW); });
    
    this.bindButtonPress(".copy-button", this.copyStates);
    this.bindButtonPress(".load-button", this.loadState);
  
    // Start the AI process
    this.startAI();
  };
  
  // Polyfill for Math.log2 if not available in the environment
  if (!Math.log2) {
    Math.log2 = function(x) {
      return Math.log(x) / Math.LN2;
    };
  }
  
  // Update the stats based on the current game grid
  AIInputManager.prototype.updateStats = function() {
    let maxValue = 0;
  
    // Find the maximum tile value
    this.currentGame.grid.eachCell((x, y, tile) => {
      if (tile) {
        maxValue = Math.max(tile.value, maxValue);
      }
    });
  
    // Calculate the index based on the highest tile value
    const index = Math.round(Math.log2(maxValue));
    while (index >= this.gameStats.length) {
      this.gameStats.push(0);
    }
    this.gameStats[index] += 1;
  
    // Calculate the total for percentage calculations
    let total = this.gameStats.reduce((sum, stat) => sum + stat, 0);
  
    // Generate HTML for displaying stats
    let html = "";
    this.gameStats.forEach((stat, i) => {
      if (stat > 0) {
        let percentage = (stat / total) * 100;
        percentage = Math.round(percentage * 10) / 10; // Round to 1 decimal place
        html += `<div class='stats-number'>${Math.pow(2, i)}:</div>`;
        html += `<div class='stats-value'>${stat} (${percentage}%)</div>`;
      }
    });
  
    // Update stats display
    $(".stats-container").html(html);
  };
  
  // Set the AI mode and update the corresponding AI algorithm
  AIInputManager.prototype.setAIMode = function(mode) {
    this.mode = mode;
    switch (mode) {
      case AiMode.RNG:
        this.ai = new RNGAI(this.currentGame);
        break;
      case AiMode.PRIORITY:
        this.ai = new PriorityAI(this.currentGame);
        break;
      case AiMode.ALGORITHM:
        this.ai = new AlgorithmAI(this.currentGame);
        break;
      case AiMode.SMART:
        this.ai = new SmartAI(this.currentGame);
        break;
    }
  };
  
  // Set the AI speed and restart the AI if it's already running
  AIInputManager.prototype.setAISpeed = function(speed) {
    this.speed = speed;
    if (this.isAiRunning) {
      this.stopAI();
      this.startAI();
    }
  };
  
  // Determine the next move for the AI
  AIInputManager.prototype.nextMove = function() {
    if (!this.ai) {
      this.setAIMode(this.mode);
    }
  
    const move = this.ai.nextMove();
    this.emit("move", move);
  
    // Handle game over and restart
    if (this.currentGame.over) {
      this.updateStats();
      this.stopAI();
      setTimeout(() => {
        this.emit("restart");
        this.startAI();
      }, 5000); // Wait 5 seconds before restarting
    } else if (this.speed === AiSpeed.FULL && this.isAiRunning) {
      setTimeout(this.nextMove.bind(this)); // Continuous move at full speed
    }
  
    // Maintain a buffer of previous game states
    if (this.previousStates.length >= this.maxStateBufferSize) {
      this.previousStates.shift();
    }
    this.previousStates.push(this.currentGame.grid.serialize());
  };
  
  // Start the AI based on the selected speed
  AIInputManager.prototype.startAI = function() {
    this.isAiRunning = true;
    switch (this.speed) {
      case AiSpeed.FULL:
        setTimeout(this.nextMove.bind(this));
        break;
      case AiSpeed.FAST:
        this.aiIntervalId = setInterval(this.nextMove.bind(this), this.fastMoveInterval);
        break;
      case AiSpeed.SLOW:
        this.aiIntervalId = setInterval(this.nextMove.bind(this), this.slowMoveInterval);
        break;
    }
  };
  
  // Stop the AI execution
  AIInputManager.prototype.stopAI = function() {
    this.isAiRunning = false;
    clearInterval(this.aiIntervalId);
  };
  
  // Restart the game
  AIInputManager.prototype.restart = function(event) {
    event.preventDefault();
    this.emit("restart");
  };
  
  // Toggle between pausing and resuming the AI
  AIInputManager.prototype.pauseOrResume = function(event) {
    event.preventDefault();
    if (this.currentGame.over) return;
    
    if (this.isAiRunning) {
      this.stopAI();
      $(".pause-button").text("Resume");
    } else {
      this.startAI();
      $(".pause-button").text("Pause");
    }
  };
  
  // Copy the previous game states to a display container
  AIInputManager.prototype.copyStates = function(event) {
    event.preventDefault();
    let html = this.previousStates.map(state => JSON.stringify(state) + "<br /><br />").join("");
    $(".copy-json").html(html);
  };
  
  // Load a game state from user input
  AIInputManager.prototype.loadState = function(event) {
    const stateJSON = $(".state-input").val();
    const state = JSON.parse(stateJSON);
    this.currentGame.grid = new Grid(state.size, state.cells);
    this.currentGame.actuate(); // Update the game state visually
  };
  
  // Utility method to bind button press events
  AIInputManager.prototype.bindButtonPress = function (selector, fn) {
    const button = document.querySelector(selector);
    if (!button) return;
    button.addEventListener("click", fn.bind(this));
    button.addEventListener(this.eventTouchend, fn.bind(this));
  };
  