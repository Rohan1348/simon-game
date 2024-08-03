var gamePattern = []; // ---> ARRAY TO STORE RANDOM BUTTOND GENERATED IN NEXT SEQUENCE FUNCTION
var buttonColours = ["red", "blue", "green", "yellow"]; // ---> BUTTONS
var userClickedPattern = []; // ---> ARRAY OF CLICKED BUTTONS

var started = false;
var level = 0;

// BEGINING GAME WITH KEYPRESS ONLY
$(".start-btn").click(function() { // ---> GAME BEGINS WITH THE KEY PRESSED
  if (!started) { // ---> KEY IS PRESSED FIRST TIME AND WE ENTER THE IF CONDITION SINCE (!FALSE = TRUE)
    $(".heading").text("LEVEL " + level);
    nextSequence(); // ---> THIS IS THE FIRST TIME A RANDOM BUTTON IS GENERATED
    started = true; // ---> NOW SINCE THIS BECAME TRUE WE CANNOT ENTER INTO THIS IF CONDITION BECAUSE (!TRUE = FALSE)
    // NOW THE GAME STARTS AND THE KEYBOARD KEYS DOES NOT DO ANYTHING IN THE GAME
  }
});

// FUNCTION PERFORMED AFTER CLICKING A BUTTON
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); // ---> GETTING ID OF THE OBJECT THAT TRIGGERED BUTTON
  userClickedPattern.push(userChosenColour); // ---> ADDING THE BUTTON CLICKED TO ARRAY OF CLICKED BUTTONS
  animatePress(userChosenColour); // ---> ADDING ANIMATION TO THE BUTTON CLICKED
  playSound(userChosenColour); // ---> PLAY SOUND OF BUTTON CLICKED
  checkAnswer(userClickedPattern.length - 1); // ---> SENDING INDEX OF LAST ELEMENT IN ARRAY(LAST BUTTON CLICKED) TO CHECK
  //  IF IT MATCHES WITH ACTUAL GAME PATTERN........
});

// CHECKING ANSWER
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // ---> CHECKING IF SEQUENCE MATCHES
    if (userClickedPattern.length === gamePattern.length) { // ---> NEXT BUTTON TO BE GENERATED ONLY AFTER THE USER CLICKS
      //  THE SAME NUMBER OF BUTTONS AS PRESENT IN THE GAME PATTERN i.e RANDOM NUMBER OF BUTTONS GENERATED TILL NOW..........
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else { // ---> OPERATIONS TO PERFORM IF WRONG SEQUENCE(ANSWER) i.e AFTER GAMEOVER
    playSound("negative");
    $("body").addClass("game-over");
    $(".heading").html("GAME OVER, PRESS ANY KEY TO RESTART");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver(); // ---> RESTART GAME
  }
}

// GENERATING RANDOM SEQUENCES OF BUTTONS
function nextSequence() {
  userClickedPattern = []; // ---> CLEARING THE ARRAY OF BUTTONS CLICKED BY USER WHEN NEW RANDOM BUTTON GENERATION TAKES PALCE
  // SO THAT NOW THE ARRAY STORES THE LATEST BUTTONS CLICKED BY THE USER..........
  level++;
  $(".heading").text("LEVEL " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); // ---> ADDING THE BUTTON GENERATED TO GAME PATTERN ARRAY
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // ---> BUTTON BLINK ANIMATION
  playSound(randomChosenColour);
}

// PLAY AUDIO
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// ANIMATION DURING BUTTON PRESS
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// RESTARTING AFTER GAMEOVER
function startOver() {
  level = 0;
  started = false;
  gamePattern = []; // ---> RESETTING THE GAME PATTERN ARRAY(CLEAR THE MEMORY OF RANDOM BUTTONS GENERATED)
}





if (annyang) {
  var commands = {
      'red': function() { handleVoiceCommand('red'); },
      'blue': function() { handleVoiceCommand('blue'); },
      'green': function() { handleVoiceCommand('green'); },
      'yellow': function() { handleVoiceCommand('yellow'); }
  };

  annyang.addCommands(commands);

  annyang.addCallback('end', function() {
    annyang.start();
});

  annyang.start({ continuous: true });
}

function handleVoiceCommand(color) {
  userClickedPattern.push(color);
  animatePress(color);
  playSound(color);
  checkAnswer(userClickedPattern.length - 1);
}

// Adding buttons to control listening
// document.getElementById('start-btn').addEventListener('click', function() {
//   annyang.start();
// });

// document.getElementById('stop-btn').addEventListener('click', function() {
//   annyang.abort();
// });
