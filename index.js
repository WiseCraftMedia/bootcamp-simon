// Start Game
$(document).ready(listenForStart());

function listenForStart() {
  $(document).on("keydown", function (ev) {
    if (ev.key === "a" || ev.key === "A") {
      $(document).off("keydown");
      userClickedPattern = [];
      nextSequence();
    }
  });
}

$(".btn").on("click", clickHandler);

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
    setTimeout(() => {
      $("#level-title").text("Press A Key to Start");
    }, 1500);
    playSound("wrong");
    $("body").toggleClass("game-over");
    setTimeout(() => {
      $("body").toggleClass("game-over");
    }, 1000);
    listenForStart();
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
  // $("#" + currentColor).addClass("pressed");
  // setTimeout(() => {
  //   $("#" + currentColor).removeClass("pressed");
  // }, 100);
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

// clickHandler(colorButton);

// $("h1").addClass("big-title");

// $("body").keypress(ev => {
//   console.log($("h1").text);
//   if ($("h1").html() === "Go away") {
//     $("h1").text(ev.key);
//   } else {
//     $("h1").html($("h1").html() + ev.key);
//   }
// });
