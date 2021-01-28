var buttons = document.getElementsByClassName('simon-button'),
  reset = document.getElementById('link-reset'),
  steps = document.getElementById('score'),
  play = document.getElementById('play'),
  audio = [],
  round,
  game;

//audio[0] = new Audio('https://sandbox.homecodeclass.com/simonSound1.mp3');
//audio[1] = new Audio('https://sandbox.homecodeclass.com/simonSound2.mp3');
//audio[2] = new Audio('https://sandbox.homecodeclass.com/simonSound3.mp3');
//audio[3] = new Audio('https://sandbox.homecodeclass.com/simonSound4.mp3');
// Plain JavaScript doesn't play sounds reliably, using howlerjs below
audio[0] = new Howl({src: ['https://sandbox.homecodeclass.com/simonSound1.mp3']});
audio[1] = new Howl({src: ['https://sandbox.homecodeclass.com/simonSound2.mp3']});
audio[2] = new Howl({src: ['https://sandbox.homecodeclass.com/simonSound3.mp3']});
audio[3] = new Howl({src: ['https://sandbox.homecodeclass.com/simonSound4.mp3']});

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

function buttonClick(button) {
  if (game.playerTurn) {
    var buttonIndex = button.target.id;
    round.playerPattern.push(parseInt(buttonIndex));
    buttonOn(button);
    check();
  }
}

function check() {
  if (round.playerPattern[round.counter] === round.pattern[round.counter]) {
    round.counter++;
    if (round.counter === round.patternLength) {
      game.playerTurn = false;
      game.steps++;
      if (game.steps === 11) {
        steps.innerHTML = '<i class="fa fa-trophy"></i>';
        setTimeout(newGame, 4000);
      } else {
        steps.innerHTML = game.steps < 10 ? "0" + game.steps : game.steps;
        setTimeout(newRound, 1500);
      }
    }
  } else {
    game.playerTurn = false;
    steps.innerHTML = '<i class="fa fa-exclamation-circle"></i>';
    setTimeout(function() {
      newGame();
    }, 1500);
  }
}

function buttonOn(button) {
  var pressed = button.target === undefined ? button : button.target.id;
  buttons[pressed].style.opacity = 1;
  audio[pressed].play();
  setTimeout(buttonOff.bind(this, pressed),250);
}

function buttonOff(buttonIndex) {
  buttons[buttonIndex].style.opacity = 0.2;
}

function playIntro() {
  for (var button = 0; button < buttons.length; button++) {
    setTimeout(buttonOn.bind(this, button), 400 * button);
  }
}

(function() {
  newGame();
  reset.onclick = newGame;
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onmousedown = buttonClick;
  }
})();
