var buttons = document.getElementsByClassName('simon-button'),
  reset = document.getElementById('link-reset'),
  steps = document.getElementById('score'),
  play = document.getElementById('play'),
  audio = [],
  round,
  game;


function Game() {
  this.playerTurn = false;
  this.pattern = [];
  this.steps = 1;
}

function newGame() {
  game = new Game();
  steps.innerHTML = "01";
  setTimeout(playIntro, 250);
  setTimeout(newRound, 2500);
}

function Round() {
  game.pattern.push(Math.floor(Math.random() * 4));
  this.patternLength = game.steps;
  this.pattern = game.pattern;
  this.playerPattern = [];
  this.counter = 0;
  this.speed = 1000;
}

function newRound() {
  round = new Round();
  showPattern();
  console.log(round.pattern); // HINT
}

function showPattern() {
  game.playerTurn = false;
  play.innerHTML = '<i class="fa fa-circle"></i>';
  for (var x = 0; x < round.patternLength; x++) {
    setTimeout(buttonOn.bind(null, round.pattern[x]), round.speed * x);
  }
  setTimeout(function() {
    game.playerTurn = true;
    play.innerHTML = '<i class="fa fa-circle-o"></i>';
  }, round.speed * round.patternLength);
}

// Record click to player's history, flash button, then check result
function buttonClick(button) {
  if (game.playerTurn) {
    var buttonIndex = button.target.id;
    round.playerPattern.push(parseInt(buttonIndex));
    buttonOn(button);
    check();
  }
}

function check() {
  // If the player's latest pattern matched the round pattern...
  if (round.playerPattern[round.counter] === round.pattern[round.counter]) {
    round.counter++;
    
    // If the player has entered a sequence of the full pattern length...
    if (round.counter === round.patternLength) {
      game.playerTurn = false;
      game.steps++;
      // If this was the winning pattern length, show trophy and restart
      if (game.steps === 11) {
        steps.innerHTML = '<i class="fa fa-trophy"></i>';
        setTimeout(newGame, 4000);
      } else {
        // (this was not the winning length, keep going with the next round)
        steps.innerHTML = game.steps < 10 ? "0" + game.steps : game.steps;
        setTimeout(newRound, 1500);
      }
    }
  } else {
    // (player's latest pattern did not match the round pattern)
    game.playerTurn = false;
    steps.innerHTML = '<i class="fa fa-exclamation-circle"></i>';
    setTimeout(function() {
      newGame();
    }, 1500);
  }
}

// Turns the button light on, plays the sound, then turns the light off
function buttonOn(button) {
  var pressed = button.target === undefined ? button : button.target.id;
  buttons[pressed].style.opacity = 1;
  audio[pressed].play();
  setTimeout(buttonOff.bind(buttons[pressed]),250);
}

function buttonOff() {
  this.style.opacity = 0.2;
}

// Play intro sequence (all four buttons one at a time)
function playIntro() {
  for (var button = 0; button < buttons.length; button++) {
    setTimeout(buttonOn.bind(this, button), 400 * button);
  }
}

function loadAudio() {
  // Plain JavaScript doesn't play sounds reliably, using howlerjs below
  audio[0] = new Howl({src: ['/simonSound1.mp3']});
  audio[1] = new Howl({src: ['/simonSound2.mp3']});
  audio[2] = new Howl({src: ['/simonSound3.mp3']});
  audio[3] = new Howl({src: ['/simonSound4.mp3']});
  
  // ... but to use plain JS, remove the lines above and uncomment these
  //audio[0] = new Audio('/simonSound1.mp3');
  //audio[1] = new Audio('/simonSound2.mp3');
  //audio[2] = new Audio('/simonSound3.mp3');
  //audio[3] = new Audio('/simonSound4.mp3');
}

// Setup: this is the main code that starts everything running
(function() {
  loadAudio();
  newGame();
  reset.onclick = newGame;
  // attach click handlers to buttons
  buttons[0].onmousedown = buttonClick;
  buttons[1].onmousedown = buttonClick;
  buttons[2].onmousedown = buttonClick;
  buttons[3].onmousedown = buttonClick;
})();
