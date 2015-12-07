/**
 * Created by Ofir Nadav on 10/27/2015.
 */
'use strict';

var BLANK   = 0;
var MINE    = ' @ ';

var gBoardSize = 10;
var gBoard; 
var gGameLevel;
var gIsGameOn = false;
var gFlags = 10;

// Main
initGame();

function initGame(){
    document.querySelector(".gameInfo").style.display = "block";
    document.querySelector(".win").style.display = "none";
    document.querySelector(".lose").style.display = "none";
    gBoard = createBoard(gBoardSize);
    renderBoard();
}

function createBoard(size) {
    var board = [];
    for (var i=0; i < size; i++) {
        var row = [];
        for (var j=0; j < size; j++) {
            row.push(BLANK);
        }
        board.push(row);
    }
    return board;
}

// Display the board
function renderBoard() {
    var boardStr = "";
    for (var i=0; i < gBoard.length; i++) {
        boardStr += '<tr>';
        for (var j = 0; j < gBoard[0].length; j++) {
            boardStr += '<td class="hiddenCell" id = "cell_'
                + i + '_' + j + '" '
                + 'onclick="checkCell(this,' + i + ',' + j + ')" '
                + 'oncontextmenu="insertFlag(this)">'
                + '</td>'
        }
        boardStr += '</tr>';
    }
    document.querySelector(".board").innerHTML = boardStr;
}

function insertFlag(elmCell){
    event.preventDefault();
    if (!gIsGameOn) return;
    if (elmCell.classList.contains("flag")) {
            elmCell.classList.remove("flag");
            elmCell.classList.add("hiddenCell");
            gFlags++;
        } else {
                elmCell.classList.remove("hiddenCell");
                elmCell.classList.add("flag");
                gFlags--;
                isWinner();
        }
    document.querySelector(".flagsNum").innerHTML = gFlags;
}

// Insert mines to random cells
function insertMines(numOfMines){
    var counter = 0;
    while (counter < numOfMines){
        var i = randomNum(0, gBoardSize);
        var j = randomNum(0, gBoardSize);
        if (gBoard[i][j] === BLANK){
            gBoard[i][j] = MINE;
            counter++;
            var elmCell = cellIndex2elm([i, j]);
            elmCell.classList.add("mine");
        }
    }
}

// Insert Hints to neighbours cells
function insertHints(){
    for (var i=0; i < gBoard.length; i++) {
        for (var j=0; j<gBoard[0].length; j++) {
            var currCell = gBoard[i][j];

            if (currCell === MINE){
                for (var ii=-1; ii<=1; ii++) {
                    for (var jj=-1; jj<=1; jj++) {

                        var currI = i + ii;
                        var currJ = j + jj;

                        if (ii === 0 && jj === 0) continue;
                        if (currI < 0 || currI >= gBoard.length) continue;
                        if (currJ < 0 || currJ >= gBoard[0].length) continue;
                        if (gBoard[currI][currJ] !== MINE) {
                            gBoard[currI][currJ]++;
                        }
                    }
                }
            }
        }
    }
}

// Convert cell element to cell index
function elm2Index (elmCell){
    var cellIndex = (elmCell.id).split('_');
    cellIndex.shift();
    for (var i = 0; i < cellIndex.length; i++){
        cellIndex[i] = parseInt(cellIndex[i]);
    }
    return cellIndex;
}

// Convert cell index to element
function cellIndex2elm (cellIndex){
    var cellStringId = '#cell_' + cellIndex[0] + '_' + cellIndex[1];
    var elCell = document.querySelector(cellStringId);
    return(elCell);
}

// Return cell value by index
function cellIndex2Value (cellIndex){
    var i = cellIndex[0];
    var j = cellIndex[1];
    return(gBoard[i][j]);
}

function checkCell(elmCell, i, j) {
    if (!isWinner() && gIsGameOn){
        if (elmCell.classList.contains("hiddenCell")){
            var cellIndex = elm2Index(elmCell);
            var cellValue = cellIndex2Value(cellIndex);
            if (cellValue === MINE) {
                gameOver(elmCell);
            } else {
                revealNegCells(elmCell);
            }
        }
    }
}

// Generate a new game
function newGame(){
    var elTimer = document.querySelector(".timer");
    elTimer.style.visibility = "visible";
    gIsGameOn = true;
    timer();
    gGameLevel = document.querySelector('.level');
    switch(gGameLevel.value) {
        case 'easy':
            gGameLevel = gFlags = 3;
            gBoardSize = 5;
            break;
        case 'beginner':
            gGameLevel = gFlags = 10;
            gBoardSize = 9;
            break;
        case 'intermediate':
            gGameLevel = gFlags = 40;
            gBoardSize = 16;
            break;
        case 'advanced':
            gGameLevel = gFlags = 99;
            gBoardSize = 20;
            break;
        default:
            gGameLevel = 10;
    }
    initGame();
    document.querySelector(".flagsNum").innerText = gFlags ;
    gBoard = createBoard(gBoardSize);
    renderBoard();
    insertMines(gGameLevel);
    insertHints();
}

function gameOver(elmCell) {
    elmCell.classList.add('red');
    console.log(elmCell);
    revealAllCells();
    displayWinOrLose('.lose');
}

function revealCell(elmCell){
    if (!(elmCell.classList.contains("hiddenCell"))) return;

    elmCell.classList.remove("hiddenCell");
    revealNegCells(elmCell);
}

function revealNegCells(elmCell){
    var cellIndex = elm2Index(elmCell);
    for (var i=-2; i<=2; i++) {
        for (var j=-2; j<=2; j++) {

            var currI = i + cellIndex[0];
            var currJ = j + cellIndex[1];

            // check borders
            if (currI < 0 || currI >= gBoard.length) continue;
            if (currJ < 0 || currJ >= gBoard[0].length) continue;

            if (gBoard[currI][currJ] !== MINE) {
                var arr = [currI, currJ];
                elmCell = cellIndex2elm(arr);
                elmCell.classList.remove("hiddenCell");

                if (gBoard[currI][currJ] !== BLANK && !(elmCell.classList.contains("flag"))) {
                    elmCell.innerHTML = cellIndex2Value(arr);
                }
            }

        }
    }
    isWinner();
}

function revealAllCells (){
    var allHiddenCells = document.querySelectorAll(".hiddenCell");
    for (var i = 0; i < allHiddenCells.length; i++) {
        var cellIndex = elm2Index(allHiddenCells[i]);
        var cellValue = cellIndex2Value(cellIndex);
        if (cellValue === MINE) {
            allHiddenCells[i].classList.remove("hiddenCell");
            allHiddenCells[i].classList.add("mine");
        }
        revealCell(allHiddenCells[i]);
    }
}

function isWinner(){
    var hiddenCells = document.querySelectorAll(".hiddenCell").length;
    hiddenCells += document.querySelectorAll(".flag").length;
    if (gGameLevel !== hiddenCells) {
        console.log(hiddenCells);
        return false;
    }
    else {
        displayWinOrLose('.win');
    }
}

function displayWinOrLose(result){
    gIsGameOn = false;
    stopTimer();
    document.querySelector(".gameInfo").style.display = "none";
    document.querySelector(result).style.display = "block";
    var elGameTime = document.querySelectorAll(".corrTime");
    if (result === '.win'){
        elGameTime[0].innerHTML = gCurrTime;
    } else {
        elGameTime[1].innerHTML = gCurrTime;
    }
}