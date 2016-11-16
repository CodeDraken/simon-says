var gameController = {
    count: 0,
    mode: "Normal",
    speed: 1200,
    waiting: false

};

var pattern = [],
    currPattern = [],
    userPattern = [];

function init() {
    gameController.waiting = false;
    pattern = [];
    userPattern = [];
    gameController.count = 0;
    $('#count').text('0');
    $('#note').text("New game!");
    $('#mode').text(gameController.mode);

    createPattern();
    showPattern();
}

// Generate number 0-3 for color
function colorGen() {
    return Math.floor(Math.random() * (3 - 0 + 1) + 0);
}

// Sets pattern array with 20 random 0-3 values
function createPattern() {
    pattern = [];
    for (var i = 20; i > 0; i--) {
        pattern.push(colorGen());
    }
    return pattern;
}

// Shows the pattern and 1 more then sets the curr pattern that's expected to be entered by user.
function showPattern() {
    var i = 0;
    gameController.waiting = false;
    var patternLoop = setInterval(function () {
        glowBtn(pattern[i]);
        i++;
        if (i >= gameController.count + 1) {
            clearInterval(patternLoop);
            currPattern = pattern.slice(0, gameController.count + 1);
            userPattern = [];
            gameController.waiting = true;
        }
    }, gameController.speed - gameController.count * 15);
}

// Glows a button and plays the sound
function glowBtn(bNum) {
    var sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + (bNum + 1) + '.mp3');
    $('#btn' + bNum).addClass('btn-press');

    setTimeout(function () {
        $('#btn' + bNum).removeClass('btn-press');
    }, 300);


    sound.play();
}

// Set the mode
function changeMode(mode) {
    gameController.mode = mode;
    $('#mode').text(gameController.mode);
}

// Checks if user input is the same as the current amount of pattern
function testPattern() {
    for (var i = 0; i < userPattern.length; i++) {
        // if the button is wrong exit and show again
        if (userPattern[i] != currPattern[i]) {
            $('#note').text("Wrong!!");
            gameController.waiting = false;
            if (gameController.mode == "Normal") {
                return showPattern();
            } else {
                init();
            }
        }
    }
    // Passes the wrong loop, checks if length is same, if so it's correct
    if (userPattern.length === currPattern.length) {
        $('#note').text("Correct!!");
        gameController.waiting = false;
        userPattern = [];
        gameController.count++;
        updateCount();
        return showPattern();
    }
}

// Sets the count html
function updateCount() {
    $('#count').text(gameController.count);
}

function checkWin() {
    if (gameController.count >= 21) {
        $('#note').text("You won!! Prepare for the next round!");
        setInterval(function () {
            gameController.speed = 1000;
            init();
        }, 5000)
    }
}

// If waiting for input, glow button / play sound, and check pattern
function clickBtn(bNum) {
    if (gameController.waiting === true) {
        glowBtn(bNum);
        userPattern.push(bNum);
        testPattern();
    }
}