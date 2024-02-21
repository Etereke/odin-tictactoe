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
    let board;
    let currentPlayer;
    let playerOneName;
    let playerTwoName;
    const players = [];
    
    const initGame = () => {
        board = GameBoard(rows, cols);
        players[0] = Player(playerOneName || 'Player 1', 'X');
        players[1] = Player(playerTwoName || 'Player 2', 'O');
        currentPlayer = players[0];
    }

    const getBoardState = () => {
        return board.getBoardState();
    }

    const playRound = (row, col) => {
        if (!board.getCell(row, col)) {
            board.setCell(row, col, currentPlayer.getMarker());
            checkGameOver();
            currentPlayer = currentPlayer === players[0]
                                ? players[1]
                                : players[0];
        }
    }

    const checkGameOver = () => {
        console.log('Check for game over');
    }

    return {
        initGame,
        getBoardState,
        playRound,
    }

})(3, 3, 3);