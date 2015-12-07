// http://www.danshort.com/HTMLentities/index.php?w=chess

var EMPTY = {
    symbol: '&nbsp;'
};

var WHITE_ROOK = {
    symbol: '&#9814;',
    player: 'player1',
    showMoves: function (i, j) {
        var rookDirection=[[0,1],[0,-1],[1,0],[-1,0]];
        directions (rookDirection, i, j);
    }
};

var WHITE_KNIGHT = {
    symbol: '&#9816;',
    player: 'player1',
    showMoves: function(i, j) {
        for (var ii=-2; ii<=2; ii++) {
            for (var jj=-2; jj<=2; jj++) {
                if (Math.abs(ii) + Math.abs(jj) !== 3) continue;

                var targetI = i + ii;
                var targetJ = j + jj;

                if (targetI < 0 || targetI >= gBoard.length ||
                    targetJ < 0 || targetJ >= gBoard.length) continue;


                markWay(targetI, targetJ);

            }

        }

    }
};

var WHITE_BISHOP = {
    symbol: '&#9815;',
    player: 'player1',
    showMoves: function (i, j) {
        var bishopDirection=[[1,1],[1,-1],[-1,1],[-1,-1]];
        directions (bishopDirection, i, j);
    }
};

var WHITE_QUEEN = {
    symbol: '&#9813;',
    player: 'player1',
    showMoves: function (i, j) {
        var queenDirection=[[1,1],[1,-1],[-1,1],[-1,-1],[0,1],[0,-1],[1,0],[-1,0]];
        directions (queenDirection, i, j);
    }
};

var WHITE_KING = {
    symbol: '&#9812;',
    player: 'player1',
    showMoves: function (i, j) {

        for (var ii=-1; ii<=1; ii++) {
            for (var jj=-1; jj<=1; jj++) {

                var targetI = i + ii;
                var targetJ = j + jj;

                if (ii === 0 && jj === 0) continue;
                if (targetI < 0 || targetI >= gBoard.length ||
                    targetJ < 0 || targetJ >= gBoard.length) continue;

                markWay(targetI, targetJ);

            }

        }
    }
};

var WHITE_PAWN = {
    symbol: '&#9817;',
    player: 'player1',
    showMoves: function (i, j) {
        for (var ii=1; ii<=2; ii++) {

            var targetI = i + ii;
            var targetJ = j;

            if (targetI < 0 || targetI >= gBoard.length) continue;

            markTarget(targetI, targetJ);
        }
    }
};

var BLACK_ROOK = {
    symbol: '&#9820;',
    player: 'player2',
    showMoves: function (i, j) {
        var rookDirection=[[0,1],[0,-1],[1,0],[-1,0]];
        directions (rookDirection, i, j);
    }
};

var BLACK_KNIGHT = {
    symbol: '&#9822;',
    player: 'player2',
    showMoves: function(i, j) {
        for (var ii=-2; ii<=2; ii++) {
            for (var jj=-2; jj<=2; jj++) {
                if (Math.abs(ii) + Math.abs(jj) !== 3) continue;

                var targetI = i + ii;
                var targetJ = j + jj;

                if (targetI < 0 || targetI >= gBoard.length ||
                    targetJ < 0 || targetJ >= gBoard.length) continue;


                markWay(targetI, targetJ);

            }

        }

    }
};

var BLACK_BISHOP = {
    symbol: '&#9821;',
    player: 'player2',
    showMoves: function (i, j) {
        var bishopDirection=[[1,1],[1,-1],[-1,1],[-1,-1]];
        directions (bishopDirection, i, j);
    }
};

var BLACK_QUEEN = {
    symbol: '&#9819;',
    player: 'player2',
    showMoves: function (i, j) {
        var queenDirection=[[1,1],[1,-1],[-1,1],[-1,-1],[0,1],[0,-1],[1,0],[-1,0]];
        directions (queenDirection, i, j);
    }
};

var BLACK_KING = {
    symbol: '&#9818;',
    player: 'player2',
    showMoves: function (i, j) {

        for (var ii=-1; ii<=1; ii++) {
            for (var jj=-1; jj<=1; jj++) {

                var targetI = i + ii;
                var targetJ = j + jj;

                if (ii === 0 && jj === 0) continue;
                if (targetI < 0 || targetI >= gBoard.length ||
                    targetJ < 0 || targetJ >= gBoard.length) continue;

                markWay(targetI, targetJ);

            }

        }
    }
};

var BLACK_PAWN = {
    symbol: '&#9823;',
    player: 'player2',
    showMoves: function (i, j) {
        for (var ii=1; ii<=2; ii++) {

            var targetI = i - ii;
            var targetJ = j;

            if (targetI < 0 || targetI >= gBoard.length) continue;

            markTarget(targetI, targetJ);
        }
    }
};

var gPlayer1 = [WHITE_ROOK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_QUEEN, WHITE_KING, WHITE_PAWN];
var gPlayer2 = [BLACK_ROOK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_QUEEN, BLACK_KING, BLACK_PAWN];
var gBoard = createBoard();
var gPlayerTurn = 'player2';
var gPiece2move = [];
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

    board[0][0] = WHITE_ROOK;
    board[0][7] = WHITE_ROOK;
    board[7][0] = BLACK_ROOK;
    board[7][7] = BLACK_ROOK;
    board[0][1] = WHITE_KNIGHT;
    board[0][6] = WHITE_KNIGHT;
    board[7][1] = BLACK_KNIGHT;
    board[7][6] = BLACK_KNIGHT;
    board[0][2] = WHITE_BISHOP;
    board[0][5] = WHITE_BISHOP;
    board[7][2] = BLACK_BISHOP;
    board[7][5] = BLACK_BISHOP;
    board[0][3] = WHITE_QUEEN;
    board[7][3] = BLACK_QUEEN;
    board[0][4] = WHITE_KING;
    board[7][4] = BLACK_KING;
    board[1][0] = WHITE_PAWN;
    board[1][1] = WHITE_PAWN;
    board[1][2] = WHITE_PAWN;
    board[1][3] = WHITE_PAWN;
    board[1][4] = WHITE_PAWN;
    board[1][5] = WHITE_PAWN;
    board[1][6] = WHITE_PAWN;
    board[1][7] = WHITE_PAWN;
    board[6][0] = BLACK_PAWN;
    board[6][1] = BLACK_PAWN;
    board[6][2] = BLACK_PAWN;
    board[6][3] = BLACK_PAWN;
    board[6][4] = BLACK_PAWN;
    board[6][5] = BLACK_PAWN;
    board[6][6] = BLACK_PAWN;
    board[6][7] = BLACK_PAWN;
    return board;
}

function renderBoard() {

    var strHtml = '';

    for (var i=0; i<gBoard.length; i++) {
        strHtml += '<tr>';
        for (var j=0; j<gBoard.length; j++) {

            var cellClass = ((i+j) % 2 )? 'black' : 'white';

            var tdHTML  = '<td id="cell-' + i + '-' + j +  '" ';
            tdHTML += 'onclick="cellClicked(' + i + ',' + j + ')" ';
            tdHTML += 'class="cell cell-';
            tdHTML += cellClass;
            tdHTML += '">';
            tdHTML += gBoard[i][j].symbol;
            tdHTML += '</td>';

            strHtml += tdHTML;
        }
        strHtml += '</tr>';
    }

    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHtml;
}

function markTarget(targetI, targetJ) {
    var targetCellId = '#cell-'+targetI+'-'+targetJ;
    var elTargetCell = document.querySelector(targetCellId);
    elTargetCell.classList.add('cell-target');
}

function unMarkTarget() {
    var elAllCell = document.querySelectorAll(".cell-target");
    for (var i = 0; i < elAllCell.length; i++){
        elAllCell[i].classList.remove('cell-target');
    }
}

function markWay(i, j) {
    console.log(gBoard[i][j].player);
    console.log('curr player: ',gPlayerTurn);
    if (gBoard[i][j] === EMPTY) {
        markTarget(i, j);
        return true;
    }else if (gBoard[i][j].player !== gPlayerTurn){
        markTarget(i, j);
        movePieces(i, j);
        return true;
    }else return false;
}

function directions (direction, i, j){
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

function cellClicked(i, j) {
    if (!(IsPlayerTurn(i, j))) return;

    if (gBoard[i][j] === EMPTY) {
        movePieces(i, j);
    }else if (gBoard[i][j].player === gPlayerTurn) {
        savePreviousCellCliced(i, j);
        gBoard[i][j].showMoves(i, j);
    } else {
        deletePiece(i, j);
    }
}

function deletePiece(i, j){
    console.log('yeeeeee');
}

function savePreviousCellCliced(i, j){
    gPiece2move.push(gBoard[i][j]);
    gPiece2move.push(i,j);
}

function movePieces (targetI, targetJ){
    var targetCellId = '#cell-'+targetI+'-'+targetJ;
    var elTargetCell = document.querySelector(targetCellId);
    if (elTargetCell.classList.contains("cell-target")){
        gBoard[targetI][targetJ] = gPiece2move.shift();
        gBoard[gPiece2move[0]][gPiece2move[1]] = EMPTY;
        gPiece2move = [];  // init the variable
        unMarkTarget();
        renderBoard();
        switchTurn();
    }else {
        unMarkTarget();
        gPiece2move = [];  // init the variable
    }
}

function switchTurn() {
    if (gPlayerTurn === 'player1'){
        gPlayerTurn = 'player2';
    }else{
        gPlayerTurn = 'player1';
    }
}

function IsPlayerTurn(i, j){
    if (gBoard[i][j].player === gPlayerTurn || gBoard[i][j] === EMPTY){
        return true;
    }
    return false;
}




