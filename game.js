var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


//Media query in Javascript (start)
var x=window.matchMedia("(max-width: 900px)"); //This x is used in another media query function below
initiatingFunction(x);
x.addListener(initiatingFunction);

function initiatingFunction(x){
  if (x.matches) {
    $("#level-title").text("Touch anywhere on the page excluding the color buttons!");

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
//media query (end)


//function to take the color chosen by user and check if correct
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});



//function to check the answer
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

      gameOverFunction(x);  //used media query here



    }
}

//function to generate next color and add it to sequence
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


//function to animate button when pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}



//function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



//same as above - media query function
function gameOverFunction(x){
  if (x.matches) {
    $("#level-title").text("Game Over, Touch on the page to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    setTimeout(startOver, 1000); //timeout is given to avoid overlapping of the click used to pick the wrong color with the click required to startover
  }
  else{
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

//function to startover
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
