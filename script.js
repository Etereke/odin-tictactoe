const PLAYERONE_WIN = 1;
const PLAYERTWO_WIN = 2;
const TIE = -1;
const NO_WINNER = 0;
const PLAYERONE_MARKER = 'X';
const PLAYERTWO_MARKER = 'O';

const GameBoard = function (rows, cols) {
    const board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i][j] = '';
        }
    }
    const setCell = (row, col, marker) => {
        board[row][col] = marker;
    }
    const getCell = (row, col) => {
        return board[row][col];
    }
    const getBoardState = () => {
        return board;
    }
    return {
        setCell,
        getCell,
        getBoardState,
    }
};

const Player = function (name, marker) {
    const getMarker = () => marker;

    return {
        name,
        getMarker,
    }
}

const GameController = (function(rows, cols, wincon) {
    let board = GameBoard(rows, cols);
    let currentPlayer;
    let playerOneName = 'Player 1';
    let playerTwoName = 'Player 2';
    let gameOver = true;
    const players = [];
    
    const initGame = () => {
        board = GameBoard(rows, cols);
        players[0] = Player(playerOneName || 'Player 1', PLAYERONE_MARKER);
        players[1] = Player(playerTwoName || 'Player 2', PLAYERTWO_MARKER);
        currentPlayer = players[0];
        gameState = 0;
    }

    const getBoardState = () => {
        return board.getBoardState();
    }

    const playRound = (row, col) => {
        if (!board.getCell(row, col) && !gameState) {
            board.setCell(row, col, currentPlayer.getMarker());
            gameState = checkGameOver();
            if(gameState) {
                console.log('The game is over!');
            } else {
                currentPlayer = currentPlayer === players[0]
                                    ? players[1]
                                    : players[0];
            }
        }
    }

    const checkGameOver = () => {
        const currentBoard = board.getBoardState();
        let tie = true;
        tie_check:
        for (row of currentBoard) {
            for (cell of row) {
                if (!cell) {
                    tie = false;
                    break tie_check;
                }
            }
        }
        if (tie) {
            return TIE
        } else {
            // Row check
            for (let i = 0; i < rows; i++) {
                let currentMarker = currentBoard[i][0];
                let counter = currentMarker ? 1 : 0;
                for (let j = 1; j < cols; j++) {
                    if (currentMarker && currentMarker === currentBoard[i][j]) {
                        counter++;
                    } else {
                        currentMarker = currentBoard[i][j];
                        counter = currentMarker ? 1 : 0;
                    }
                    if (counter >= wincon) {
                        return currentMarker === PLAYERONE_MARKER
                                    ? PLAYERONE_WIN
                                    : PLAYERTWO_WIN;
                    }
                }
            }
            // Col check
            for (let i = 0; i < cols; i++) {
                let currentMarker = currentBoard[0][i];
                let counter = currentMarker ? 1 : 0;
                for (let j = 1; j < rows; j++) {
                    if (currentMarker && currentMarker === currentBoard[j][i]) {
                        counter++;
                    } else {
                        currentMarker = currentBoard[j][i];
                        counter = currentMarker ? 1 : 0;
                    }
                    if (counter >= wincon) {
                        return currentMarker === PLAYERONE_MARKER
                                    ? PLAYERONE_WIN
                                    : PLAYERTWO_WIN;
                    }
                }
            }
            // Left-right diagonal check, right side
            for (let i = 0; i < cols - wincon + 1; i++) {
                let currentMarker = currentBoard[0][i];
                let counter = currentMarker ? 1 : 0;
                for (let j = 1; i + j < cols; j++) {
                    if (currentMarker && currentMarker === currentBoard[j][i + j]) {
                        counter++;
                    } else {
                        currentMarker = currentBoard[j][i + j];
                        counter = currentMarker ? 1 : 0;
                    }
                    if (counter >= wincon) {
                        return currentMarker === PLAYERONE_MARKER
                                    ? PLAYERONE_WIN
                                    : PLAYERTWO_WIN;
                    }
                }
            }
            // Left-right diagonal check, left side
            for (let i = 0; i < rows - wincon + 1; i++) {
                let currentMarker = currentBoard[i][0];
                let counter = currentMarker ? 1 : 0;
                for (let j = 1; i + j < rows; j++) {
                    if (currentMarker && currentMarker === currentBoard[i + j][j]) {
                        counter++;
                    } else {
                        currentMarker = currentBoard[i + j][j];
                        counter = currentMarker ? 1 : 0;
                    }
                    if (counter >= wincon) {
                        return currentMarker === PLAYERONE_MARKER
                                    ? PLAYERONE_WIN
                                    : PLAYERTWO_WIN;
                    }
                }
            }

        };
    }

    return {
        initGame,
        getBoardState,
        playRound,
    }

})(10, 10, 3);