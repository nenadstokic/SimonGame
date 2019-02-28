//jshint esversion: 6

const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const randomChosenColour = buttonColors[nextSequence()];
gamePattern.push(randomChosenColour);

function nextSequence(){
  const randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  return randomNumber;
}
