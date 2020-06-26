const statusDisplay = document.getElementById('game-status');

let gameActive = true;

let currentPlayer = `<img src="meme.png" alt="">`;

let currentPlayerName = 'Luca';

let gameState =    ["", "", "",
                    "", "", "", 
                    "", "", "",];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const winningMassage = () => `Player ${currentPlayerName} has WON !`;
const drawMassage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `Its ${currentPlayerName}'s turn!`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
gameState[clickedCellIndex] = currentPlayer;
clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    if(currentPlayer === `<img src="meme.png" alt="">`) {
        currentPlayer = `<img src="luca.jpg" alt="">`
        currentPlayerName = 'Luca';
    } else {
        currentPlayer = `<img src="meme.png" alt="">`;
        currentPlayerName = 'Ricardo';
    }
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if(a === '' || b === '' || c === '') {
            continue;
        }
        if(a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if(roundWon) {
        statusDisplay.innerHTML = winningMassage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if(roundDraw) {
        statusDisplay.innerHTML = drawMassage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));



    if (!gameActive || gameState[clickedCellIndex] !== "") {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayerName = 'Luca';
    currentPlayer = `<img src="luca.jpg" alt="">`;
    gameState =    ["", "", "","", "", "", "", "", "",];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart-game').addEventListener('click', handleRestartGame);
