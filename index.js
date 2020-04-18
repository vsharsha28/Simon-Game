var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;



var x=window.matchMedia("(max-width: 900px)"); 
initiatingFunction(x);
x.addListener(initiatingFunction);

function initiatingFunction(x){
  if (x.matches) {
    $("#level-title").text("Touch anywhere around the buttons to Start!");

    $(document).click(function() {
      if (!started) {
        $("#level-title").text("Level " + level);
        setTimeout(nextSequence, 1000);
        started = true;
      }
    });

  }
  else {
    $("#level-title").text("Press A Key to Start");

    $(document).keypress(function() {
      if (!started) {
        $("#level-title").text("Level " + level);
        setTimeout(nextSequence, 1000);
        started = true;
      }
    });
  }
}



$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");

      gameOverFunction(x);



    }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}



function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}



function gameOverFunction(x){
  if (x.matches) {
    $("#level-title").text("Game Over, Touch anywhere around the buttons to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    setTimeout(startOver, 1000);
  }
  else{
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    setTimeout(startOver, 1000);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}