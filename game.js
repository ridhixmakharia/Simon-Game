
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;

//Code sees what button was clicked by the user
$(".btn").click(function(event){
  var userChosenColour = event.currentTarget.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickPattern.push(userChosenColour);
  checkAnswer(userClickPattern.length - 1);
});




$(document).one("keypress",function(){
  if(!started){
    newSequence();
    $("h1").text("Level "+level);
    started = true;
  }
});



//Code to generate a pattern for the game
function newSequence(){
  var randomChosenColour;
  userClickPattern = [];
  var  randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#"+randomChosenColour).fadeOut().fadeIn();
  ++level;
  $("h1").text("Level "+level);
}



function checkAnswer(currentLevel){
  if(userClickPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("Success");
    if(JSON.stringify(userClickPattern) === JSON.stringify(gamePattern)){
      setTimeout(newSequence(),1000);
    }
  }
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over :(");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}


function startOver(){
  level=0;
  gamePattern=[];
  started = false;
}



function playSound(name){
  switch(name){
    case "red":
              var audio = new Audio("sounds/red.mp3");
              audio.play();
              break;
    case "blue":
              var audio = new Audio("sounds/blue.mp3");
              audio.play();
              break;
    case "green":
              var audio = new Audio("sounds/green.mp3");
              audio.play();
              break;
    case "yellow":
              var audio = new Audio("sounds/yellow.mp3");
              audio.play();
              break;
}
}


function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
