// Jordyn Schnupp
// J00688738

function AIInputManager() {
    this.events = {}; // Event listeners
    this.listen(); // Start listening for button presses
}

AIInputManager.prototype.isAiRunning = false; // AI running state
AIInputManager.prototype.currentGame = null; // Game object reference
AIInputManager.prototype.previousStates = []; // Storage for previous game states

AIInputManager.prototype.on = function (event, callback) {
    if (!this.events[event]) {
        this.events[event] = []; // Create a new event array if it doesn't exist
    }
    this.events[event].push(callback);
};

AIInputManager.prototype.emit = function (event, data) {
    const callbacks = this.events[event];
    if (callbacks) {
        callbacks.forEach(function (callback) {
            callback(data);
        });
    }
};

AIInputManager.prototype.listen = function () {
    // Bind buttons to their respective actions
    this.bindButtonPress(".retry-button", this.restart);
    this.bindButtonPress(".copy-button", this.copyStates);
    this.bindButtonPress(".load-button", this.loadState);

    // Start the AI process
    this.startAI();
};

// Update the stats based on the current game grid
AIInputManager.prototype.updateStats = function() {
    // Placeholder for stats update logic
};

// Determine the next move for the AI
AIInputManager.prototype.nextMove = function() {
    if (!this.ai) {
        this.ai = new SmartAI(this.currentGame); // Use SmartAI as the default
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
    }
  
    // Maintain a buffer of previous game states
    if (this.previousStates.length >= 10) {
        this.previousStates.shift();
    }
    this.previousStates.push(this.currentGame.grid.serialize());
};

// Start the AI
AIInputManager.prototype.startAI = function() {
    this.isAiRunning = true;
    setTimeout(this.nextMove.bind(this));
};

// Stop the AI execution
AIInputManager.prototype.stopAI = function() {
    this.isAiRunning = false;
};

// Restart the game
AIInputManager.prototype.restart = function(event) {
    event.preventDefault();
    this.emit("restart");
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
