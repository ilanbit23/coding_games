// Theses are global variables
var theNum;
var theMax = 10;
var falseGuess;
var trueGuess;
var roundScore=0;
var totalScore;
var stageNum = 1;
var strTotalScore;

// If we dont know it yet, we ask the user for his name and keep in localStorage
if (!localStorage.userName) {
    localStorage.userName = prompt("Your name?");
}

editTotalScore();

function editTotalScore(){
    strTotalScore = localStorage.getItem("totalScore");
    //get a numeric value from strTotalScore, put it in totalScore
    if (strTotalScore == NaN || strTotalScore == "NaN"){
        totalScore = 0;
    } else {
        totalScore = parseInt(strTotalScore);
    } // end if
    //increment totalScore
    totalScore=totalScore+roundScore;
    //display totalScore
    document.querySelector("#totalScore").innerHTML = totalScore;
    //store totalScore
    localStorage.setItem("totalScore", totalScore);
} // end totalScore

document.querySelector("#totalScore").innerHTML = totalScore;

// initialize the game for the first time
initStage();

// This function is in charge for initializing the game
function initGame() {
    theMax = 10;
    document.querySelector('#max').innerText = theMax;
    theNum = 1 + Math.floor(Math.random() * theMax);
    console.log(theNum);
    stageNum = 1;
    document.querySelector('#stage').innerText = stageNum;
    roundScore = 100;
    document.querySelector("#roundScore").innerHTML = roundScore;
    totalScore = 0;
    document.querySelector("#totalScore").innerHTML = totalScore;
    localStorage.setItem("totalScore", totalScore);
    alert("Game Restarted");
}

// This function is in charge for initializing the Stage
function initStage() {
    document.querySelector('#max').innerText = theMax;
    theNum = 1 + Math.floor(Math.random() * theMax);
    console.log(theNum);
    document.querySelector('#stage').innerText = stageNum;
    roundScore=100;
    document.querySelector("#roundScore").innerHTML = roundScore;
}

// This function is called when user click the GUESS button
function userGuess() {
    var guess = prompt('Guess the number');

    // TODO: use parseInt to convert the guess to a number

    // if user has guesses right, we increase the range and re-initialize the game
    if (guess == theNum) {
        alert('Yes! You made it!');
        theMax *=2;
        editTotalScore();
        document.querySelector("#totalScore").innerHTML = totalScore;
        stageNum++;
        initStage();
    } else {
        if ((guess = parseInt(guess)) < theNum) {
            alert('Your guess is too low. try again!')
            roundScore=roundScore-10;
            document.querySelector("#roundScore").innerHTML = roundScore;
            if (roundScore<15){
                alert('Game Over')
                initGame();
                document.querySelector("#totalScore").innerHTML = totalScore;
            }
        }
            else { if ((guess = parseInt(guess)) > theNum) {
                    alert('Your guess is too high. try again!')
                    roundScore=roundScore-10;
                    document.querySelector("#roundScore").innerHTML = roundScore;
                if (roundScore<15){
                    alert('Game Over')
                    initGame();
                    document.querySelector("#totalScore").innerHTML = totalScore;
                }
            }
            }
        }


}

