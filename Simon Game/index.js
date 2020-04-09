var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$("body").one("keypress", function() {
  nextSequence();
});

$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor.trim());

  playAudio(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  if( gamePattern[currentLevel] == userClickedPattern[currentLevel] ){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {nextSequence();}, 1000);
    }
  }
  else{
    console.log(gamePattern + "  " + userClickedPattern);
    var gameOver = new  Audio("sounds/wrong.mp3");
    gameOver.play();
    $("body").addClass("game-over");
    setTimeout(function () { $("body").removeClass("game-over");}, 200);
    $("h1").text( "Game Over, Reload to Restart");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor.trim());
  $("." + randomChosenColor).fadeOut().fadeIn();

  playAudio(randomChosenColor);

}

function playAudio(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  //given id when mouse userClickedPattern
  var grey = $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    grey.removeClass("pressed");
  }, 100);
}
