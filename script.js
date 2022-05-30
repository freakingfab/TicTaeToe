const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage');
const restartbtn = document.getElementById('restart');
const winning_comb = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];
const X_Class = 'x';
const Circle_Class = 'circle';
let circleTurn;
restartbtn.addEventListener('click', startGame);
startGame();
function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_Class)
    cell.classList.remove(Circle_Class)
    cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true });
    });
    setboardhoverclass();
    winningMessageElement.classList.remove('show')
}


function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? Circle_Class : X_Class;
    placemark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
    swapTurns()
    setboardhoverclass()
}
function placemark(cell, currentClass) {
    cell.classList.add(currentClass);
}
function swapTurns() {
    circleTurn = !circleTurn;
}
function setboardhoverclass(){
    board.classList.remove(X_Class);
    board.classList.remove(Circle_Class);
    if (circleTurn) board.classList.add(Circle_Class);
    else board.classList.add(X_Class);
}
function checkWin(currentClass) {
    return winning_comb.some(combination => {
      return combination.every(index => {
        return cellElements[index].classList.contains(currentClass)
      })
    })
  }
function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Draw!'
    } else {
      winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
  }

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_Class) || cell.classList.contains(Circle_Class)
      })
  }