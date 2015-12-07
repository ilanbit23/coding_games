'use strict';

var gPlayer = {
    name: '',
    bestScore: 0
    };

var gSounds = {
    a : new Audio('sounds/a.mp3'),
    b : new Audio('sounds/b.mp3'),
    c : new Audio('sounds/c.mp3'),
    d : new Audio('sounds/d.mp3'),
    e : new Audio('sounds/e.mp3')

};
var gState = {
    seq: '',
    currTurn: {
        isUserTurn: false,
        playedNotesCount : 0
    }
};
//localStorage.name = gPlayer.name;

$(document).ready(function(){
    init();
});

function init() {
    gState.seq = '';
    gState.currTurn.isUserTurn = false;
    gState.currTurn.playedNotesCount = 0;

    if (localStorage.bestScore || localStorage.name) {
        if (!localStorage.bestScore) localStorage.bestScore = 0;

            gPlayer.bestScore = localStorage.bestScore;
        if (localStorage.name){
            gPlayer.name = localStorage.name;
            var welcomeBack = 'Welcome back ' + localStorage.name;
            var nav = document.querySelector("nav");
            nav.querySelector("h1").innerHTML = welcomeBack;
            var insertScore = nav.querySelector(".insertScores");
            insertScore.innerHTML ='<br' + '/> Best Score: ' + gPlayer.bestScore;
        }
    }else {
        var newUser = document.querySelector(".newUser");
        newUser.style.display = "block";
    }
}

function newUser(){
    gPlayer.name = document.querySelector("#playerName").value;
    localStorage.name = gPlayer.name;
}


// handel Simon turn
function simonTurn(){

    if (!gState.currTurn.isUserTurn){
        extendSeq();
        playSeq();
    }

    switchTurns();
}

// play the sound sequence
function  playSeq(){

    var i = 0;
    var intervalID = setInterval(function() {
        activeNote(char2elm(gState.seq[i]));
        gSounds[gState.seq[i]].play();

        i++;
        if (i >= gState.seq.length) {
            clearInterval(intervalID);
        }
    }, 1000);

    //audio.append('<source src="sounds/' + tile + '.ogg" type="audio/ogg" />');
    //audio.append('<source src="sounds/' + tile + '.mp3" type="audio/mp3" />');
}

// add char to note sequence
function  extendSeq(){
    var possible = "abcde";

    gState.seq += possible.charAt(Math.floor(Math.random() * possible.length));
}


//function  renderUI(){
//    var strHtml = '';
//    strHtml += '<div class='+'"board">';
//    for (var i = 1; i <= 5; i++){
//        strHtml += '<div class="'
//            + 'note ' + 'note-'+ i +'" '
//            + 'value="' + i + '" '
//            + 'onclick="' + 'noteClicked(this)"'
//            + '></div>';
//    }
//    strHtml += '</div>';
//    document.querySelector("main").innerHTML = strHtml;
//}

// handel note clicked
function noteClicked(elmNote){
    if (!gState.currTurn.isUserTurn) return;

    gState.currTurn.playedNotesCount++;
    if (gState.currTurn.playedNotesCount < gState.seq.length) {
        playedNotesUpdate(elmNote);
    } else if (gState.currTurn.playedNotesCount === gState.seq.length) {
        playedNotesUpdate(elmNote);
        updateRoundScore();
        gState.currTurn.playedNotesCount = 0;
    }

}

// light up and play sound for the clicked note + note correct check
function playedNotesUpdate(elmNote){
    activeNote(elmNote);

    if (!isNoteMatch(elmNote, gState.currTurn.playedNotesCount)){
        gameOver();
    }
}

// light up and play sound for the given note
function activeNote(elmNote) {
    elmNote.classList.add('active');
    setTimeout(function() {
        elmNote.classList.remove('active');
    }, 400);
    playNote(elmNote);
}

function playNote(elmNote){
    gSounds[elmNote.id].play();
}


function updateRoundScore(){
    switchTurns();
    var scoreNum = document.querySelector(".scoreNum");
    scoreNum.innerText = parseInt(scoreNum.innerText)+1;
    setTimeout(function() {
        simonTurn();
    }, 800);
}

function switchTurns() {
    var turnInfo = document.querySelector(".turnInfo");
    if (gState.currTurn.isUserTurn){
        turnInfo.innerText = "Simon Turn";
    } else{
        turnInfo.innerText = "Your Turn";
    }
    gState.currTurn.isUserTurn = !gState.currTurn.isUserTurn;
}

// check if right note clicked according to the sequence
function isNoteMatch(elmNote, index){
//return gState.seq[index-1] === elmNote.id;

    if (gState.seq[index-1] !== elmNote.id){
        return false;
    } else {
        return true;
    }
}

function gameOver(){
    if (gPlayer.bestScore < gState.seq.length){
        gPlayer.bestScore = gState.seq.length;
        localStorage.bestScore = gState.seq.length;
    }

    var overlayDialogue = document.querySelector("nav");
    overlayDialogue.style.display = "flex";
    var msg = overlayDialogue.querySelector("h1");
    msg.innerText = 'Game Over';
    var insertScore = overlayDialogue.querySelector(".insertScores");
    insertScore.innerHTML = 'Game Score: ' + gState.seq.length
        +' <br' + '/>Best Score: ' + gPlayer.bestScore;
    var userInfo = document.querySelector("footer");
    userInfo.style.display = "none";

}

// convert note element to char
function char2elm(char){
    var elm = document.querySelector("#"+ char);
    return(elm);
}

function startGame(elmButton){
    init();
    document.querySelector("nav").style.display = "none";
    var userInfo = document.querySelector("footer");
    userInfo.style.display = "flex";
    var turnInfo = userInfo.querySelector(".turnInfo");
    userInfo.querySelector(".bestScoreNum").innerHTML = gPlayer.bestScore;
    userInfo.querySelector(".scoreNum").innerHTML = 0;
    turnInfo.innerText = "Simon Turn";
    simonTurn();

}

