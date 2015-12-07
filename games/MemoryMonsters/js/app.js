
// Scripted By Adam Khoury in connection with the following video tutorial:
// http://www.youtube.com/watch?v=c_ohDPWmsM0
// var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var memory_array = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8','9','9','10','10','11','11','12','12'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var audioRight = new Audio('sound/right.mp3');
var audioWrong = new Audio('sound/wrong.mp3');
var audioWin = new Audio('sound/win.mp3');

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){
    tiles_flipped = 0;
    var output = '';
    memory_array.memory_tile_shuffle();
    for(var i = 0; i < memory_array.length; i++){
        output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
}
function memoryFlipTile(tile,val){
    if(tile.innerHTML == "" && memory_values.length < 2){
//		tile.style.background = '#FFF';
//		tile.innerHTML = val;
        console.log(val);
        var imgName = "img/cards/"+val+".png";
        console.log(imgName);
        tile.style.backgroundImage = 'url(' + imgName + ')';
        if(memory_values.length == 0){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if(memory_values.length == 1){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            if(memory_values[0] == memory_values[1]){
                audioRight.play();
                tiles_flipped += 2;
                // Clear both arrays
                memory_values = [];
                memory_tile_ids = [];
                // Check to see if the whole board is cleared
                if(tiles_flipped == memory_array.length){
                    audioWin.play();
                    alert("Board cleared... generating new board");
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                }
            } else {
                function flip2Back(){
                    audioWrong.play();
                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = 'url(img/cards/back.png) no-repeat';
                    tile_1.style.backgroundSize = 'contain';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(img/cards/back.png) no-repeat';
                    tile_2.style.backgroundSize = 'contain';
                    tile_2.innerHTML = "";
                    // Clear both arrays
                    memory_values = [];
                    memory_tile_ids = [];
                }
                setTimeout(flip2Back, 700);
            }
        }
    }
}

window.addEventListener(newBoard());

/*
// Those are global variables, they stay alive and reflect the state of the game
var elPrevCard = null;
var flippedCouplesCount = 0;

// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 2;

// This is part of HTML5, we can easily load and play audio files
var audio = new Audio('sound/right.mp3');

// This function is called whenever the user click a card
function cardClicked(elCard) {

    // we make it a jquery object
    elCard = $(elCard);

    // If the user clicked an already flipped card - do nothing and return from the function
    if (elCard.hasClass('flipped')) {
        return;
    }

    // Flip it
    elCard.addClass('flipped');

    // This is a first card, only keep it in the global variable
    if (elPrevCard === null) {
        elPrevCard = elCard;
    } else {
        // get the data-card attribute's value from both cards
        var card1 = elPrevCard.data('card');
        var card2 = elCard.data('card');

        // No match, schedule to flip them back in 1 second
        if (card1 !== card2){
            setTimeout(function () {
                elCard.removeClass('flipped');
                elPrevCard.removeClass('flipped');
                elPrevCard = null;
            }, 1000)

        } else {
            // Yes! a match!
            flippedCouplesCount++;
            elPrevCard = null;

            // All cards flipped!
            if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
                audio.play();
                console.log('WIN');
                flippedCouplesCount = 0;
                setTimeout(function () {
                    $('.card').removeClass('flipped');
                }, 3000)
            }


        }




    }


}

*/