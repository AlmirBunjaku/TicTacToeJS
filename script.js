const gameBoard = (() => {
    let _board = {
        positions: [null, null, null, null, null, null, null, null, null]
    }
    return { _board };
})()

const Player = (name = 'Player', mark) => {
    const getName = () => {
        return name;
    }
    const getMark = () => {
        return mark;
    }
    return { getName, getMark };
}

const checkResult = (board) => {
    let winningResults = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < winningResults.length; i++) {
        let currentCombination = winningResults[i];
        if (board[currentCombination[0]] && board[currentCombination[0]] === board[currentCombination[1]] && board[currentCombination[1]] === board[currentCombination[2]]) {
            return true; // win
        }
    }

    if (!board.includes(null)) {
        return false; // draw
    }
}

const displayController = (() => {
    const currentBoard = gameBoard._board;
    let _moveCounter = 0;

    const clearBoard = () => {
        currentBoard.positions = [null, null, null, null, null, null, null, null, null]
        squares.forEach((square) => {
            square.textContent = '';
        })
    }

    const resetBoard = (previousWinner) => {
        _moveCounter = previousWinner % 2 === 0 ? 1 : 0;
        clearBoard();
    }

    const enablePositions = () => {
        squares.forEach((square) => {
            square.addEventListener('click', (e) => {
                let markedSquare = e.target;
                let markedSquareId = e.target.id[e.target.id.length - 1];
                playMove(markedSquare, markedSquareId);
            })
            square.status = false;
        })
    }

    const playMove = (square, id) => {
        if (currentBoard.positions[id] === null) {
            let currentPlayer;
            let otherPlayer;
            if (_moveCounter % 2 == 0) {
                currentPlayer = playerX;
                otherPlayer = playerO;
                square.textContent = currentPlayer.getMark();
                square.style.color = 'hsl(115, 100%, 70%)';
                square.style.fontFamily = '\'Mali\'';
                currentBoard.positions[id] = currentPlayer.getMark();
            } else {
                currentPlayer = playerO;
                otherPlayer = playerX;
                square.textContent = currentPlayer.getMark();
                square.style.color = 'hsl(0, 100%, 70%)';
                currentBoard.positions[id] = currentPlayer.getMark();
            }
            _moveCounter++;
            if (checkResult(currentBoard.positions) == true) {
                setTimeout(() => {
                    alert(currentPlayer.getName() + ' wins!');
                    if (currentPlayer.getMark() == 'X') {
                        resetBoard(0);
                        enablePositions();
                    } else {
                        resetBoard(1);
                        enablePositions();
                    }
                }, 100);
            } else {
                if (currentBoard.positions.includes(null)) {
                    return;
                } else {
                    setTimeout(() => {
                        alert('It\'s a draw!');
                        if (currentPlayer.getMark() == 'X') {
                            resetBoard(0);
                            enablePositions();
                        } else {
                            resetBoard(1);
                            enablePositions();
                        }
                    }, 100);
                }
            }
        } else {
            return;
        }
    }
    return { enablePositions, resetBoard, playMove }
})()

let display = displayController;
let playerX;
let playerO;

let squares = document.querySelectorAll('.square');
let startButton = document.querySelector('#startButton');
startButton.addEventListener('click', () => {
    let playerXName = document.querySelector('#playerXName').value;
    let playerOName = document.querySelector('#playerOName').value;

    if (playerXName == '' || playerOName == '') {
        alert('Please enter player names.');
    } else {
        playerX = Player(playerXName, 'X');
        playerO = Player(playerOName, 'O');
        display.enablePositions();
    }
})

let resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', () => {
    window.location.reload();
})