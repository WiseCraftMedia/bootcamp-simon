// Start Game
$(document).on("keydown", function (ev) {
  if (ev.key === "a" || ev.key === "A") {
    $(document).off("keydown");
    console.log(pattern.length);
    sequence();
  }
});

$(".btn").on("click", storeClick);

var btnColors = ["red", "blue", "green", "yellow"];
var pattern = [];
var userPattern = [];
var level = 0;

function storeClick(ev) {
  var userChosenColor = ev.currentTarget.id;
  var colorIndex = btnColors.indexOf(userChosenColor);
  userPattern.push(userChosenColor);
  playSound(userChosenColor);
  sequence(userChosenColor);
  checkAnswer(colorIndex, userChosenColor);
}

function checkAnswer(latestClick, userChosenColor) {
  // if latest answer = color Index, success
  if (userPattern[latestClick] === pattern[latestClick]) {
    console.log("success");
  } else {
    console.log("incorrect, was " + userChosenColor);
  }
  console.log(pattern.length);
}

function sequence() {
  var rand = Math.floor(Math.random() * 4);
  var rngChosen = btnColors[rand];
  pattern.push(rngChosen);
  playSound(rngChosen);
  animatePress(rngChosen);
  $("#level-title").text(`Level ${level}`);
  level++;
}

function animatePress(currentColor) {
  $("#" + currentColor)
    .fadeOut(50)
    .fadeIn(50)
    .fadeOut(50)
    .fadeIn(50);
}

function playSound(name) {
  var patternSound = new Audio(`./sounds/${name}.mp3`);
  patternSound.play();
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
