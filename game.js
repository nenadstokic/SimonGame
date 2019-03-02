//jshint esversion: 6

const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
const userClickedPattern = [];
var randomChosenColour;
let gameStarted = false;
var level = 0;


const buttons = document.querySelectorAll(".btn");
buttons.forEach(function(button){
  button.addEventListener("mouseup", function(){
    const userChosenColour = button.id;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern.length-1);
    checkAnswer(userClickedPattern.length-1);
  });
});

document.addEventListener("keyup", function(){
  if(gameStarted === false) {
    nextSequence();
  }
  gameStarted = true;
});

function nextSequence(){
  userClickedPattern.length = 0;
  level++;
  document.querySelector("#level-title").textContent = "Level " + level;

  const randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColors[randomNumber];
  console.log(randomNumber);
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
  //return randomNumber;
}

function checkAnswer(currentLevel) {
  if(gameStarted){ // da bismo sprecili anoying game over repeat
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      console.log("success");
      if(userClickedPattern.length === gamePattern.length) {
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    } else {
      console.log("wrong");
      playSound("wrong");
      document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart!";
      document.querySelector("body").classList.add("game-over");
      setTimeout(function(){
        document.querySelector("body").classList.remove("game-over");
      },200);
      startOver();
    }
  }

}

function startOver(){
  gamePattern.length = 0;
  gameStarted = false;
  level = 0;
}

function playSound(name){
  const soundFile = "sounds/" + name + ".mp3";
  const audio = new Audio(soundFile);
  audio.play();
}

function animatePress(currentColor){
  const pressedButton = document.querySelector("#"+currentColor);
  pressedButton.classList.add("pressed");
  setTimeout(function(){
    pressedButton.classList.remove("pressed");
  }, 100);
}
