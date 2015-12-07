// Global Variables
var gBalloons;
var gIsGameOn = false;
var gIntervalBalloons = null;
var gNewGame = false;
var gCounter = 0;

var BOARD_END = 600;

function createBalloons() {
    gBalloons = [];
    var balloon = {color: 'red', left: 200, bottom: 20, speed: Math.floor(Math.random() * 10) + 1};
    gBalloons.push(balloon);
    balloon = {color: 'blue', left: 500, bottom: 20, speed: Math.floor(Math.random() * 10) + 1};
    gBalloons.push(balloon);
    balloon = {color: 'yellow', left: 800, bottom: 20, speed: Math.floor(Math.random() * 10) + 1};
    gBalloons.push(balloon);
    balloon = {color: 'green', left: 1100, bottom: 20, speed: Math.floor(Math.random() * 10) + 1};
    gBalloons.push(balloon);

}

function initGame() {
    createBalloons();

    var board = document.querySelector('.board');
    board.innerHTML = '';
    var strHtml = '';
    gBalloons.forEach(function (balloon, index) {
        strHtml +=   '<div class="balloon" ' +
            'style="background-color:' + balloon.color + '; left:'+balloon.left+'px' +
            '; bottom:'+balloon.bottom+'px"' +
            'onclick="balloonClicked('+index+')"' +
            '></div>';
    });
    board.innerHTML += strHtml;
    gNewGame = true;
}

function startGame() {
    if (gIsGameOn) {
        return;
    } else if (!gNewGame) initGame();

    gIsGameOn = true;
    var elBalloons = document.querySelectorAll('.balloon');

    gIntervalBalloons = setInterval(function () {
        // move all Balloons
        for (var i=0; i < elBalloons.length; i++) {
            var elBalloon   = elBalloons[i];
            var balloon     = gBalloons[i];
            balloon.bottom += balloon.speed;
            elBalloon.style.bottom = balloon.bottom + 'px';

            if (balloon.bottom >= BOARD_END) {
                pauseGame();
                if (gCounter === gBalloons.length){
                    alert('Game Over, You win');
                }else alert('Game Over, Try Again');
                gNewGame = false;
                gCounter = 0;

            }

        }

    }, 70);
}

function pauseGame() {
    gIsGameOn = false;
    if (gIntervalBalloons) {
        clearInterval(gIntervalBalloons);
        gIntervalBalloons = null;
    }
}

function balloonClicked(index) {
    if (gIsGameOn) {
        var balloon = document.querySelectorAll('.balloon');
        balloon[index].style.opacity = '0';
        gCounter++;
    }
}