const X_CLASS = 'x'
const O_CLASS = 'oo'
let X_Score = 0
let O_Score = 0

let board = document.getElementById('board')
let cellElements = document.querySelectorAll('[data-cell]')
let winningMsg = document.getElementById('winningMessage')
let msgText = document.querySelector('[data-winning-message-text]')
let Player_X = true
let winning_combo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

startGame()

function startGame()
{
    cellElements.forEach(element => {
        element.classList.remove(X_CLASS)
        element.classList.remove(O_CLASS)
        element.removeEventListener('click',playGame)
        element.addEventListener('click',playGame,{ once : true })
    })
    hoverState();
    winningMsg.classList.remove('show')
}

function playGame(e)
{
    let cell = e.target
    let currentPlayer = Player_X ? X_CLASS : O_CLASS

    // Place Marker
    placeMarker(cell,currentPlayer)

    if (checkWinner(currentPlayer)) {
        if (currentPlayer == X_CLASS) {
            X_Score++
            document.getElementsByClassName('x-score')[0].innerHTML = X_Score
        }else{
            O_Score++
            document.getElementsByClassName('o-score')[0].innerHTML = O_Score
        }
        winningMsg.classList.add('show')
        msgText.innerHTML = `${currentPlayer == X_CLASS ? "X's " : "O's "} Wins`
    }else if(isDraw()){
        winningMsg.classList.add('show')
        msgText.innerHTML = `Draw`
    }else{
        switchTurn(currentPlayer)
        hoverState()
    }
}

function placeMarker(cell, curClass)
{
    cell.classList.add(curClass)
}

function switchTurn(currentPlayer)
{
    Player_X = !Player_X
}

function hoverState()
{
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)

    var nextPlayer = Player_X ? X_CLASS : O_CLASS

    board.classList.add(nextPlayer);
}

function checkWinner(currentPlayer)
{
    return winning_combo.some(combo => {
        return combo.every(i => {
            return cellElements[i].classList.contains(currentPlayer)
        })
    })
}

function isDraw()
{
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

document.getElementById('restartButton').addEventListener('click',function(){
  startGame()
})