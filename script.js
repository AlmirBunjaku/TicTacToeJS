"use strict"

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

let squares = document.querySelectorAll('.square');

const displayController = (() => {
    const currentBoard = gameBoard._board;
    let _moveCounter = 0;
    let _previousCounter = _moveCounter;

    const clearBoard = () => {
        _moveCounter = _previousCounter === 0 ? 1 : 0;
        currentBoard.positions = [null, null, null, null, null, null, null, null, null]
        squares.forEach((square) => {
            square.textContent = '';
        })
    }

    const resetBoard = () => {
        clearBoard();
        enablePositions();
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

    // for disabling play until names are entered * add to return
    // const disablePositions = () => {
    //     squares.forEach((square) => {
    //         square.status = true;
    //     })
    // }

    const playMove = (square, id) => {
        if (currentBoard.positions[id] === null) {
            if (_moveCounter % 2 == 0) {
                square.textContent = 'X';
                currentBoard.positions[id] = 'X';
                console.log(checkResult(currentBoard.positions));
                if (checkResult(currentBoard.positions) == true) {
                    alert(playerX.getName() + ' wins!');
                    resetBoard();
                }
            } else {
                square.textContent = 'O';
                currentBoard.positions[id] = 'O';
                console.log(checkResult(currentBoard.positions));
                if (checkResult(currentBoard.positions) == true) {
                    alert(playerO.getName() + ' wins!');
                    resetBoard();
                }
            }
            _moveCounter++;
        } else {
            return;
        }
    }
    return { enablePositions, resetBoard, playMove }
})(document)

let display = displayController;
display.enablePositions();
let playerX = Player('First', 'X');
let playerO = Player('Second', 'O');