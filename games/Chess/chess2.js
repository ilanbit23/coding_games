// http://www.danshort.com/HTMLentities/index.php?w=chess

var EMPTY = {
    symbol: '&nbsp;'
};

var ROOK = {
    symbol: '&#9814;',
    showMoves: function (i, j) {
        var direction=[[0,1],[0,-1],[1,0],[-1,0]];

        for (var k = 0; k < direction.length; k++){

            var stepI = direction[k][0];
            var stepj = direction[k][1];
            var targetI = i;
            var targetJ = j;
            while (targetI >= 0 && targetJ >= 0 && targetI < 8 && targetJ < 8){
                if (targetI === i && targetJ === j) {
                    targetI += stepI;
                    targetJ += stepj;
                    continue;
                }
                if (gBoard[targetI][targetJ] !== EMPTY) break;
                markTarget(targetI, targetJ);
                targetI += stepI;
                targetJ += stepj;
            }

        }

    }
};

var KNIGHT = {
    symbol: '&#9816;',
    showMoves: function(i, j) {

        for (var ii=-2; ii<=2; ii++) {
            for (var jj=-2; jj<=2; jj++) {
                if (Math.abs(ii) + Math.abs(jj) !== 3) continue;

                var targetI = i + ii;
                var targetJ = j + jj;

                if (targetI < 0 || targetI >= gBoard.length ||
                    targetJ < 0 || targetJ >= gBoard.length) continue;


                markTarget(targetI, targetJ);

            }

        }

    }
};


var gBoard = createBoard();
renderBoard();




function createBoard() {
    var SIZE = 8;

    var board = [];

    for (var i=0; i<SIZE; i++) {
        board.push([]);
        for (var j=0; j<SIZE; j++) {
            board[i].push(EMPTY);
        }
    }

    //board[4][4] = KNIGHT;

    board[4][4] = ROOK;
    board[6][4] = KNIGHT;
    return board;
}

function renderBoard() {

    var strHtml = '';

    for (var i=0; i<gBoard.length; i++) {
        strHtml += '<tr>';
        for (var j=0; j<gBoard.length; j++) {

            var cellClass = ((i+j) % 2 )? 'black' : 'white';

            strHtml += '<td id="cell' + i + '-' + j +  '"';
            strHtml += ' onclick="cellClicked(this,' + i + ',' + j + ')"';
            strHtml +=' class="cell cell-';
            strHtml += cellClass;
            strHtml += '">';
            strHtml += gBoard[i][j].symbol;
            strHtml += '</td>';
        }
        strHtml += '</tr>';
    }

    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHtml;
}


function cellClicked(elCell, i, j) {
    if (gBoard[i][j] !== EMPTY) {
        gBoard[i][j].showMoves(i, j);
    }
}

function markTarget(targetI, targetJ) {
    var targetCellId = '#cell'+targetI+'-'+targetJ;
    console.log(targetCellId);
    var elTargetCell = document.querySelector(targetCellId);
    elTargetCell.classList.add('cell-target');

}