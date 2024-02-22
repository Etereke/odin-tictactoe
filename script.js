const PLAYERONE_WIN = 1;
const PLAYERTWO_WIN = 2;
const TIE = -1;
const NO_WINNER = 0;
const PLAYERONE_MARKER = 'X';
const PLAYERTWO_MARKER = 'O';
const GAMESIZE_SMALL = 1;
const GAMESIZE_BIG = 2;

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

const GameController = function(rows, cols, wincon) {
    let board = GameBoard(rows, cols);
    let currentPlayer;
    let playerOneName = 'Player 1';
    let playerTwoName = 'Player 2';
    let gameState = NO_WINNER;
    const players = [];
    
    const initGame = () => {
        board = GameBoard(rows, cols);
        players[0] = Player(playerOneName || 'Player 1', PLAYERONE_MARKER);
        players[1] = Player(playerTwoName || 'Player 2', PLAYERTWO_MARKER);
        currentPlayer = players[0];
        gameState = NO_WINNER;
    }

    const getBoardState = () => {
        return board.getBoardState();
    }

    const playRound = (row, col) => {
        if (!board.getCell(row, col) && !gameState) {
            board.setCell(row, col, currentPlayer.getMarker());
            gameState = checkGameOver();
            if(gameState) {
                console.log(gameState);
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
            let isWon = WinChecker.Row(currentBoard);
            if (isWon) return isWon;
            else isWon = WinChecker.Column(currentBoard);
            if (isWon) return isWon;
            else isWon = WinChecker.PrimaryDiagonal(currentBoard);
            if (isWon) return isWon;
            else isWon = WinChecker.SecondaryDiagonal(currentBoard);
            return isWon;
        };
    }

    const WinChecker = (function () {
        const Row = (currentBoard) => {
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
            return NO_WINNER;
        }
        const Column = (currentBoard) => {
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
            return NO_WINNER;
        }
        const PrimaryDiagonal = (currentBoard) => {
            // Above primary diagonal
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
            // Below primary diagonal
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
            return NO_WINNER;
        }
        const SecondaryDiagonal = (currentBoard) => {
            // Above secondary diagonal
            for (let i = wincon - 1; i < cols; i++) {
                let currentMarker = currentBoard[0][i];
                let counter = currentMarker ? 1 : 0;
                for (let j = 1; i - j >= 0; j++) {
                    if (currentMarker && currentMarker === currentBoard[j][i - j]) {
                        counter++;
                    } else {
                        currentMarker = currentBoard[j][i - j];
                        counter = currentMarker ? 1 : 0;
                    }
                    if (counter >= wincon) {
                        return currentMarker === PLAYERONE_MARKER
                                    ? PLAYERONE_WIN
                                    : PLAYERTWO_WIN;
                    }
                }
            }
            // Below secondary diagonal
            for (let i = 0; i < rows - wincon + 1; i++) {
                let currentMarker = currentBoard[i][cols - 1];
                let counter = currentMarker ? 1 : 0;
                for (let j = cols - 2; j >= i; j--) {
                    if (currentMarker && currentMarker === currentBoard[i + (cols - j - 1)][j]) {
                        counter++;
                    } else {
                        currentMarker = currentBoard[i + (cols - j - 1)][j];
                        counter = currentMarker ? 1 : 0;
                    }
                    if (counter >= wincon) {
                        return currentMarker === PLAYERONE_MARKER
                                    ? PLAYERONE_WIN
                                    : PLAYERTWO_WIN;
                    }
                }
            }
            return NO_WINNER;
        }
        return {
            Row,
            Column,
            PrimaryDiagonal,
            SecondaryDiagonal,
        }
    })();

    return {
        initGame,
        getBoardState,
        playRound,
    }

};

const ViewController = (function(){
    let gameController = GameController(3, 3, 3);
    let gameSize = GAMESIZE_SMALL;
    const gameContainerDiv = document.querySelector('.game-container');

    const initView = () => {
        if (gameSize === GAMESIZE_SMALL) {
            gameController = GameController(3, 3, 3);
            gameContainerDiv.classList.add('game-small');
            gameContainerDiv.classList.remove('game-big');
        } else if (gameSize === GAMESIZE_BIG) {
            gameController = GameController(20, 20, 5);
            gameContainerDiv.classList.add('game-big');
            gameContainerDiv.classList.remove('game-small');
        }
        gameController.initGame();
        drawBoard();
    }

    const drawBoard = () => {
        gameContainerDiv.replaceChildren();
        const boardState = gameController.getBoardState();
        for (let i = 0; i < boardState.length; i++) {
            for (let j = 0; j < boardState[i].length; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if (boardState[i][j] === PLAYERONE_MARKER) {
                    cell.classList.add('player-one-color');
                } else if (boardState[i][j] === PLAYERTWO_MARKER) {
                    cell.classList.add('player-two-color');
                }
                cell.textContent = boardState[i][j];
                cell.dataset.i = i;
                cell.dataset.j = j;
                gameContainerDiv.appendChild(cell);
            }
        }
    }

    const handleClick = (row, col) => {
        gameController.playRound(row, col);
        drawBoard();
    }

    return {
        handleClick,
        initView,
    }

})();