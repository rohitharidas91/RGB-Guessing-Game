
var pickedColor = "";
var randomColors = [];
var userColor = "";
var pointValue = 0;
var gameStart = true;
var lives = 3;
var gameMode = 6;
var square = document.querySelectorAll(".square");
var winColor = document.querySelector("#pickedColor");
var retry = document.querySelector("#retry");
var mode = document.querySelectorAll(".mode");
var message = document.querySelector("#message");
var points = document.querySelector("#points");
var heart = document.querySelectorAll(".heart");
var nextLevel = document.querySelector("#nextLevel");

//initiate

init();
function init(){
  pointValue = 0;
  gameStart = true;
  lives = heart.length;
  message.innerHTML = "";
  points.innerHTML = pointValue;
  nextLevel.style.opacity = "0";
  nextLevel.style.pointerEvents = "none";
  colorSquares();
  pickColor();
  enableSquares();
  for(i = 0; i < lives ;i++){
    heart[i].style.opacity = "1";
  }
};
// enable clicking squares for new round
function enableSquares(){
  for(var i = 0 ; i < gameMode ; i++){
    square[i].style.pointerEvents = "all";
  }
};

// generate random colors
function rgbColors(){
  var r = Math.floor(Math.random()*256);
  var g = Math.floor(Math.random()*256);
  var b = Math.floor(Math.random()*256);
  return "rgb(" + r + ", " + g + ", " + b +")";
}

// assign colors to squares
function colorSquares(){
    randomColors = [];
    for(var i = 0 ; i < gameMode ; i++){
    randomColors.push(rgbColors());
    square[i].style.backgroundColor = randomColors[i];
  }
  return randomColors;
}

//pick a color for victory condition
function pickColor(){
  var i = Math.floor(Math.random()*gameMode);
  pickedColor = randomColors[i];
  winColor.innerHTML = pickedColor.toUpperCase();
  return pickedColor;
}

// click handler
for(i = 0; i < 6; i++){
    square[i].addEventListener("click",function(){
       clickHandler(this);
  });
}

function clickHandler(clickedSquare){
  var clickedColor = clickedSquare.style.backgroundColor;
  if(clickedColor === pickedColor){
      correct(pickedColor);
   }
   else{
     incorrect(clickedSquare);
   }
}

// Victory function
function correct(pickedColor){
  document.querySelector("#heading").style.backgroundColor = pickedColor;
  for(i = 0; i < gameMode ; i++){
  square[i].style.backgroundColor = pickedColor;
  square[i].style.pointerEvents = "none";
};
  message.innerHTML = "YOU WIN!"
  pointValue++;
  points.innerHTML = pointValue;
  nextLevel.style.opacity = "1";
  nextLevel.style.pointerEvents = "all";
  nextLevel.innerHTML = "NEXT LEVEL";
};
// Loss Function

function incorrect(clickedSquare){
  if(lives > 0){
    clickedSquare.style.backgroundColor = "#232323";
    clickedSquare.style.pointerEvents = "none";
    lives--;
    loseLife(heart.length-lives);
  }
  else{
    nextLevel.style.opacity = "1";
    nextLevel.style.pointerEvents = "all";
    message.innerHTML = "GAME OVER";
    nextLevel.innerHTML = "TRY AGAIN?";
    gameStart = false;
    for(i = 0; i < gameMode ; i++){
      square[i].style.backgroundColor = "#232323";
      square[i].style.pointerEvents = "none";
    }
  }
};
function loseLife(l){
  for(i = 0; i < l ;i++){
    heart[i].style.opacity = "0";
  }
}

// retry or reinitialize on clicking new game
retry.addEventListener("click",init);
// Difficulty mode - Refactored
for(i = 0; i < 2; i++){
  mode[i].addEventListener("click",function(){
     dMode(this.getAttribute("id"));
   });
}

function dMode(difficulty){
  if (difficulty === "easy"){
    gameMode = 3;
    for(i = 3; i < 6 ; i++)
    square[i].style.display = "none";
    init();
  } else if (difficulty === "hard"){
    gameMode = 6;
    for(i = 0; i < 6 ; i++)
    square[i].style.display = "block";
    init();
  };
};

//go to next level

nextLevel.addEventListener("click",function(){
  if(gameStart){
    colorSquares();
    pickColor();
    enableSquares();
    this.style.opacity = "0";
    this.style.pointerEvents = "none";
  }
  else{
    init();
  }
});


/****************************************/
// This is Wetter code than the above //
// it does the same thing//
/**************************/

//      ********variables *******

//var easy = document.querySelector("#easy");
//var hard = document.querySelector("#hard");

//      **********************


// Game Mode - EASY
/*
easy.addEventListener("click",easyMode);

function easyMode(){
  gameMode = 3;
  for(i = 3; i < 6 ; i++)
  square[i].style.display = "none";
  init();
}

// Game Mode - Hard

hard.addEventListener("click",hardMode);

function hardMode(){
  gameMode = 6;
  for(i = 0; i < 6 ; i++)
  square[i].style.display = "block";
  init();
}*/
