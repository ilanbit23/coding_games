var SIZE = 3;
var gNextNum = 1;
var gCurrIntervalID = null;
var gIsGameOn = false;

function countDown(){
    gIsGameOn = false;
    var counter = 3;
    var elCountDown = document.querySelector('.countDown');
    //elCountDown.innerHTML = '';
    var intervalID = setInterval(function(){
        var snd = new Audio("sound/countDown.mp3");
        snd.play();
        fadeIn(elCountDown);
        elCountDown.innerHTML = counter;
        counter --;
        if (counter < 0){
            clearInterval(intervalID);
            elCountDown.style.display = "none";
            startGame();
        }
    }, 1000);
}

function audio(){
    var snd = new Audio("sound/countDown.mp3");
    snd.play();
}

function startGame() {

    var elBoard = document.querySelector('.board');
    var strHtml = '';
    var nums = prepareNumsArray(SIZE*SIZE);
    shuffle(nums);
    stopTimer();


    for (var i=0; i<SIZE; i++) {
        strHtml += '<tr>';
        for (var j=0; j<SIZE; j++) {

            var num = nums.pop();

            strHtml += '<td class="btn"onclick="cellClicked(this,' + num + ')">' + num + '</td>';

        }
        strHtml += '</tr>';
    }
    elBoard.innerHTML = strHtml;
    timer();
}

function cellClicked(elCell, num) {

    if (num === gNextNum) {
        elCell.classList.add('done');

        gNextNum++;

        if (gNextNum > SIZE*SIZE) {
            elCell.classList.remove("btn");
            elCell.classList.add("btnClicked");
            var snd = new Audio("sound/flip.mp3");
            snd.play();
            handleWin();

        } else {
            elCell.classList.remove("btn");
            elCell.classList.add("btnClicked");
            snd = new Audio("sound/flip.mp3");
            snd.play();
            updateNextNum();
        }
    }
}

function handleWin() {
    var snd = new Audio("sound/win.mp3");
    snd.play();
    stopTimer();
    setTimeout(function() {
        confirm('WINNER! Your time is: ' + gCurrTime);
    }, 100);
    document.querySelector('.board').innerHTML = '';
    SIZE++;
    gNextNum = 1;
    updateNextNum();
    countDown();
}


function updateNextNum() {
    var elNextNum = document.querySelector('#nextNum');
    elNextNum.innerHTML = gNextNum;
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function prepareNumsArray(size) {
    var nums= [];
    for (var i=1; i <= size; i++) {
        nums.push(i);
    }
    return nums;
}
