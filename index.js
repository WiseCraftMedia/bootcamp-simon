$("button").on("click", function () {
  sequence();
});

var btnColors = ["red", "blue", "green", "yellow"];
var pattern = [];

function sequence() {
  var rand = Math.floor(Math.random() * 4);
  var chosen = btnColors[rand];
  pattern.push(chosen);
  $("#" + chosen)
    .fadeOut(50)
    .fadeIn(50)
    .fadeOut(50)
    .fadeIn(50);
  var patternSound = new Audio(`./sounds/${chosen}.mp3`);
  patternSound.play();
  return pattern;
}
sequence();

// $("h1").addClass("big-title");

// $("body").keypress(ev => {
//   console.log($("h1").text);
//   if ($("h1").html() === "Go away") {
//     $("h1").text(ev.key);
//   } else {
//     $("h1").html($("h1").html() + ev.key);
//   }
// });
