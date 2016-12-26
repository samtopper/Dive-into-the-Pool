// Enemies our player must avoid
// possible locations for bugs along Y-axis.
var y_position = [50, 130, 210, 290];
var counter = 0;

// The 'images/sprite' for our enemies, this uses a helper we've provided to easily load images
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    // randomly selected Y location for each bug
    this.y = y_position[Math.floor(Math.random() * 4)];
    // for random speed of the bugs
    this.speed = Math.floor(100 + (Math.random() * 200));
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiplying any movement by the dt parameter which will ensure the game runs
    // at the same speed for all computers.
    this.x += this.speed * dt;
    //if enemy moves out of the frame, below code changes enemy's speed and Y location (i.e. row).
    if (this.x > 505) {
        this.x = -101;
        this.y = this.y + 83;
        this.speed = Math.floor(100 + (Math.random() * 200));
        // avoiding enemy to allocate any Y location on grass.
        if (this.y > 300) {
            this.y = 60;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class.
// This class requires an update(), render() and a handleInput() method.

// setting up player function properties
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    return this;
};

Player.prototype.update = function() {
    // moving player in the direction of the button pressed.
    if (this.keyPressed === 'left' && this.x !== 0) {
        this.x = this.x - 50;
    } else if (this.keyPressed === 'right' && this.x != 400) {
        this.x = this.x + 50;
    } else if (this.keyPressed === 'up') {
        this.y = this.y - 41;
    } else if (this.keyPressed === 'down' && this.y != 400) {
        this.y = this.y + 41;
    }
    // to provide the player a hop movement set the value of 'keyPressed' to null.
    this.keyPressed = null; // otherwise, player will continue to move in one direction.
    this.checkCollision();

    // reseting player location
    if (this.y < 30) {
        confirm("You Won!\n" + '\n' + "Click 'OK' to Dive again.");
        this.reset();
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    this.keyPressed = key;
};

// resetting Players location
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// checking for collision between enemy and player.
// Only 5 collisions are allowed.
Player.prototype.checkCollision = function() {
    for(var i = 0; i<allEnemies.length; i++) {
        if (!(allEnemies[i].y + 40 < this.y || allEnemies[i].y > this.y + 40 ||
            allEnemies[i].x + 50 < this.x || allEnemies[i].x > this.x + 50)) {

                counter = counter + 1;
                if(counter >= 5) {
                    confirm('Ohh!' + '\n' + "lost all your lives." + '\n' + "Click 'OK' to Play Again.");
                    counter = 0;
                }
                this.reset();
            }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var totalEnemies = 5;
var allEnemies = [];

for (var i = 0; i < totalEnemies; i++) {
    allEnemies.push(new Enemy());
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
