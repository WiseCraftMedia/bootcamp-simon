$(".start-game").on("click", function () {
  userClickedPattern = [];
  nextSequence();
  $(".start-game").addClass("hidden");
  $(".btn").on("click", clickHandler);
});

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var userClicks = 0;

function clickHandler(ev) {
  var userChosenColor = ev.currentTarget.id;
  userClickedPattern.push(userChosenColor);
  checkAnswer(userChosenColor);
}

function checkAnswer(userChosenColor) {
  if (
    userChosenColor === gamePattern[userClicks] &&
    gamePattern.length === userClickedPattern.length
  ) {
    // correct & add to sequence
    userClickedPattern = [];
    playSound(userChosenColor);
    nextSequence();
    userClicks = 0;
  } else if (userChosenColor === gamePattern[userClicks]) {
    // correct but pattern not complete
    console.log("yes");
    playSound(userChosenColor);
    userClicks++;
  } else if (userChosenColor !== gamePattern[userClicks]) {
    //wrong answer, reset for game restart
    userClickedPattern = [];
    gamePattern = [];
    userClicks = 0;
    level = 0;
    $("#level-title").text("GAME OVER");
    $("body").toggleClass("game-over");
    $(".start-game").toggleClass("game-over");
    $(".btn").off("click");
    playSound("wrong");
    setTimeout(() => {
      $("#level-title").text("Simon");
      $("body").toggleClass("game-over");
      $(".start-game").toggleClass("game-over");
      $(".start-game").removeClass("hidden");
    }, 1000);
  }

  gamePattern;
  if (gamePattern.length === userClickedPattern.length && gamePattern === userClickedPattern) {
    userClickedPattern = [];
    nextSequence();
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var rngChosenColor = buttonColors[randomNumber];
  gamePattern.push(rngChosenColor);
  setTimeout(() => {
    playSound(rngChosenColor);
    animatePress(rngChosenColor);
  }, 1000);
  level++;
  $("#level-title").text(`Level ${level}`);
}

function animatePress(currentColor) {
  $("#" + currentColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(name) {
  var sound = new Audio(`./sounds/${name}.mp3`);
  sound.play();
}
