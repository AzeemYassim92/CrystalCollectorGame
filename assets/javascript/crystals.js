//start the page
$(document).ready(function() {

//current guess #
let yourMatchingNumber = 0;

//random#
let randomNum = randomNumGen();

//starting variables
let wins = 0;
let losses = 0;
let crystals;

function randomNumCrystals() {
  //crystals guessing
  return {
    red: {
      points: Math.floor(Math.random() * 12) + 1,
      imageUrl: "assets/images/red.jpg"
      
    },
    blue: {
      points: Math.floor(Math.random() * 12) + 1,
      imageUrl: "assets/images/blue.jpg"
    },
    yellow: {
      points: Math.floor(Math.random() * 12) + 1,
      imageUrl: "assets/images/yellow.jpg"
    },
    green: {
      points: Math.floor(Math.random() * 12) + 1,
      imageUrl: "assets/images/green.jpg"
    },
  };
}


//random num generator between 19 and 120 
function randomNumGen() {
  return Math.floor(Math.random() * 102) + 19;
}

//resetting the game
function setGame() {
  yourMatchingNumber = 0;
  //random crystal values
  crystals = randomNumCrystals();
  randomNum = randomNumGen();
  //generate random number / render to page
  $("#random-area").text(randomNum);
}

function updateDom(didUserWin) {
  $("#win-area").empty();

//if won
if (didUserWin === true) {
  $("#win-area").append($("<p>").text("You won!!"));
  setGame();
  renderMatchingNumber();
}
else if (didUserWin === false) {
  $("#win-area").append($("<p>").text("You Lost!!"));
  setGame();
  renderMatchingNumber();
}

//win /loss display and posting to page

var wSpan = $("<span>").text(wins);
var lSpan = $("<span>").text(losses);

var pWins = $("<p>").text("Wins: ");
var pLosses = $("<p>").text("Losses: ");

pWins.append(wSpan);
pLosses.append(pLosses);

}

//render crystals to page

function renderCrystals() {
  for (var key in crystals) {
    var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
    var crystalImg = $("<img alt ='image' class='crstal-img'>").attr("src", crystals[key].imageUrl);
    crystalDiv.append(crystalImg);
    $("#crystal-area").append(crystalDiv);
  }
}

function updateMatchingNumber(crystal) {
  yourMatchingNumber += crystals[crystal.attr("data-name")].points;
}

//render current guess to page
function renderMatchingNumber() {
  var scoreNumDiv = $("<div id='score-number'>").text(yourMatchingNumber);
  $("#score-area").html();
  $("#score-area").html(scoreNumDiv);
}

//call functions to start game
setGame();
updateDom();
renderCrystals();
renderMatchingNumber();

//on-click event for the crystals

$(".crystals-button").on("click", function(event) {
  //update our "current guess" number and re-render it. 
  updateMatchingNumber($(this));
  renderMatchingNumber();

//check if win or lose

if (yourMatchingNumber === randomNum) {
  wins++;
  setGame();
  updateDom(true);
}

else if (yourMatchingNumber > randomNum) {
  losses++;
  setGame();
  updateDom(false);
}

  });

});