var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
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

function checkAnswer(currentLevel){
  if( gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
    //console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {nextSequence();}, 1000);
    }
  }
  else{
    //console.log("wrong");
    $("body").addClass("game-over");
  }
}

$("body").one("keypress", function() {
  nextSequence();
});

$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  playAudio(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(gamePattern.length - 1);
});
