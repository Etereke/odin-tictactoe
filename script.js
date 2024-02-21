const gameBoard = (function (rows, cols) {

    const board = [];
    
    const setCell = (row, col, marker) => {
        board[row][col] = marker;
    }

    const getCell = (row, col) => {
        return board[row][col];
    }

    const initializeBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < cols; j++) {
                board[i][j] = '';
            }
        }
    }

    const printBoard = () => {
        return board;
    }

    return {
        setCell,
        getCell,
        initializeBoard,
        printBoard,
    }
})(3, 3)
