const gameBoard = document.getElementById('game-board');
const resetBtn = document.getElementById('reset');
const setNameBtn = document.getElementById('set-custom');
const customHeader = document.getElementById('custom-header');
const customContent = document.getElementById('custom-content');

//Global variables
const playerNames = ['X', 'O'];
let isPlayer1 = true;

const updateNames = name => {
    document.getElementById('next-player').textContent = name;
}

setNameBtn.addEventListener('click', () => {
    const player1Name = document.getElementById('player1-input').value;
    const player2Name = document.getElementById('player2-input').value;
    console.log(player1Name, player2Name);

    if (player1Name !== '') {
        playerNames[0] = player1Name;
    } else {
        playerNames[0] = 'X'
    }

    if (player2Name !== '') {
        playerNames[1] = player2Name;
    } else {
        playerNames[1] = '0'
    }

    updateNames(isPlayer1 ? playerNames[0] : playerNames[1]);
    customContent.classList.toggle('hidden');
})

customHeader.addEventListener('click', () => {
    customContent.classList.toggle('hidden');
})

const drawBoard = () => {
    
    for (let i = 0; i < 9; i++) {
        gameBoard.innerHTML += `<div class="cell" id="cell-${i}"></div>`
    }

}

const game = () => {
    let playCount = 0;
    let player1 = [];
    let player2 = [];
    updateNames(isPlayer1 ? playerNames[0] : playerNames[1]);

    const winningCondition = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ];

    let winningCells = [];

    const cells = document.querySelectorAll('.cell');   

    const isGameWon = player => {

        console.log(playCount);
        if (playCount >= 9) {
            document.getElementById('subtitle').textContent = "It's a tie!";
        }

        if (player === 0) {
            winningCondition.forEach(condition => {
                if (condition.every(number => player1.includes(number))) {
                    winningCells = [...condition];
                    gameWon(player);
                }
            });
        } else {
            winningCondition.forEach(condition => {
                if (condition.every(number => player2.includes(number))) {
                    winningCells = [...condition];
                    gameWon(player);
                }
            });
        }

    }

    const gameWon = player => {
        document.getElementById('subtitle').textContent = `Player ${playerNames[player]} wins!!`;
        cells.forEach((cell, index) => {
            if (winningCells.includes(index)) {
                cell.style.backgroundColor = 'green';
                cell.style.color = 'white';
            }
            cell.onclick = null;
        })
    }    

    const reset = () => {
        document.getElementById('subtitle').innerHTML = 'Next Player: <span id="next-player"></span>';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = 'white';
        });
        isPlayer1 = true;
        game();
    }

    resetBtn.addEventListener('click', reset);

    cells.forEach((cell, index) => {

        cell.onclick = () => {
            playCount++;
            if (isPlayer1) {
                cell.style.color = 'var(--dark-blue)';
                cell.textContent = 'X';
                player1.push(index);
                isGameWon(0);
                isPlayer1 = !isPlayer1;
                updateNames(playerNames[1]);                
            } else {
                cell.style.color = 'var(--red)';
                cell.textContent = 'O';
                player2.push(index);
                isGameWon(1);
                isPlayer1 = !isPlayer1;
                updateNames(playerNames[0]);
            }
            cell.onclick = null;
        }
    })
}

const setup = () => {
    drawBoard();    
    game();
}

setup();