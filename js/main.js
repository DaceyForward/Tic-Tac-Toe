//GAME INSPIRED BY MY TWO-YEAR-OLD DAUGHTER

// 1) Define required constants
    // 1.1) Define a colors object with keys of 'null' (when the square is empty), and players 1 & -1. The value assigned to each key represents the color to display for an empty square (null), player 1 and player -1.

    // I wanted the players names to be 'Elsa' and 'Anna' but can't figure out how to keep the colors I want too..

    const COLORS = {
        0: 'lightgrey', 
        1: 'paleturquoise', 
        '-1': 'plum'
    }

    
    // 1.2) Define the 8 possible winning combinations, each containing three indexes of the board that make a winner if they hold the same player value.

    const leftDownWin = [1, 0, 0, 1, 0, 0, 1, 0, 0]
    const middleDownWin = [0, 1, 0, 0, 1, 0, 0, 1, 0]
    const rightDownWin = [0, 0, 1, 0, 0, 1, 0, 0, 1]
    const topAcrossWin = [1, 1, 1, 0, 0, 0, 0, 0, 0]
    const middleAcrossWin = [0, 0, 0, 1, 1, 1, 0, 0, 0]
    const bottomAcrossWin = [0, 0, 0, 0, 0, 0, 1, 1, 1]
    const topLeftDiagonalWin = [1, 0, 0, 0, 1, 0, 0, 0, 1]
    const topRightDiagonalWin = [0, 0, 1, 0, 1, 0, 1, 0, 0]

// 2) Define required variables used to track the state of the game
// 2.1) Use a board array to represent the squares.
let board

// 2.2) Use a turn variable to remember whose turn it is.
let turn

// 2.3) Use a winner variable to represent three different possibilities - player that won, a tie, or game in play.
let winner

// 3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
// 3.1) Store the 9 elements that represent the squares on the page.
const gameCellEls = [...document.querySelectorAll('#cells > div')]
//console.log('this is gameCellEls', gameCellEls)
const messageEl = document.querySelector('h3')

const playAgainButton = document.querySelector('button')

// 4) Upon loading the app should:
//   4.1) Initialize the state variables
        // 4.1.1) Initialize the board array to 9 nulls to represent empty squares. The 9 elements will "map" to each square, where index 0 maps to the top-left square and index 8 maps to the bottom-right square.
init()

function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]

        // 4.1.2) Initialize whose turn it is to 1 (player 'X'). Player 'O' will be represented by -1.

    turn = 1
    console.log('init, turn is', turn)

        // 4.1.3) Initialize winner to null to represent that there is no winner or tie yet. Winner will hold the player value (1 or -1) if there's a winner. Winner will hold a 'T' if there's a tie. 

    winner = null
   render()
}

//   4.2) Render those values to the page
// 4.2.1) Render the board:
renderBoard()

function renderBoard() {
     // 4.2.1.1.1) Loop over each of the 9 elements that represent the squares on the page, and for each iteration:
    let cellId = -1
     board.forEach(function(cell) {
        // 4.2.1.1.2) Use the index of the iteration to access the mapped value from the board array.
        // 4.2.1.1.3) Set the background color of the current element by using the value as a key on the colors lookup object (constant).
       
        cellId = cellId + 1
        // const cellId = `${board.indexOf(cell)}`
        const cellEl = document.getElementById(cellId)
        cellEl.style.backgroundColor = COLORS[cell]
        
        //console.log('this is board', cellId)

    })
}

        // 4.2.2) Render a message:
renderMessage()

function renderMessage() {

    // 4.2.2.1) If winner has a value other than null (game still in progress), render whose turn it is - use the color name for the player, converting it to upper case.
    // 4.2.2.2) If winner is equal to 'T' (tie), render a tie message.
    // 4.2.2.3) Otherwise, render a congratulatory message to which player has won - use the color name for the player, converting it to uppercase.
     
    if (winner === 'T') {
        messageEl.innerText = "It's a Tie Game!!"
    // message the winner
    } else if (winner) {
        messageEl.innerHTML = `
            <span style="color: ${COLORS[winner]}">
                ${COLORS[winner].toUpperCase()}
            </span> WINS!!
        `
    // message the current turn
    } else {
        messageEl.innerHTML = `
            <span style="color: ${COLORS[turn]}">
                ${COLORS[turn].toUpperCase()}
            </span>'s TURN!
        `
    }
}
  
// 4.3) Wait for the user to click a square

function render() {
    renderBoard()
    renderMessage()
    renderControls()
}

// 5) Handle a player clicking a square
// 5.1) Obtain the index of the square that was clicked by either:
    // 5.1.1) "Extracting" the index from an id assigned to the element in the HTML, or
function handleClick(event) {
    const cellId = gameCellEls.indexOf(event.target)
    console.log('inside handleClick function. cellId clicked', cellId)


    // 5.1.2) Looping through the cached square elements using a for loop and breaking out when the current square element equals the event object's target.
        // ----see above----

// 5.2) If the board has a value at the index, immediately return because that square is already taken.
    if (board[cellId] != 0) {
        console.log('square', cellId, 'taken')
        return
    }

// 5.3) If winner is not null, immediately return because the game is over.
    if (winner) {
        return
    }

// 5.4) Update the board array at the index with the value of turn.
    board[cellId] = turn

// 5.5) Flip turns by multiplying turn by -1 (flips a 1 to -1, and vice-versa).
    turn *= -1
    console.log('turn is', turn)

// 5.6) Set the winner variable if there's a winner:
    // 5.6.1) Loop through each of the winning combination arrays defined.
    // 5.6.2) Total up the three board positions using the three indexes in the current combo.
    // 5.6.3) Convert the total to an absolute value (convert any negative total to positive).
    // 5.6.4) If the total equals 3, we have a winner! Set winner to the board's value at the index specified by the first index in the combo array. Exit the loop.

    totalLD = board[0] + board[3] + board[6]
    console.log('totalLD =', totalLD)
    totalLDAbs = Math.abs(totalLD)
    console.log('totalLDAbs =', totalLDAbs)
    if (totalLDAbs === 3) {
        winner = board[0] 
        console.log('LD winner')
    }
    
    totalMD = board[1] + board[4] + board[7]
    totalMDAbs = Math.abs(totalMD)
    if (totalMDAbs === 3) {
        winner = board[1] 
        console.log('MD winner')
    }

    totalRD = board[2] + board[5] + board[8]
    totalRDAbs = Math.abs(totalRD)
    if (totalRDAbs === 3) {
        winner = board[2] 
        console.log('RD winner')
    }

    totalTA = board[0] + board[1] + board[2]
    totalTAAbs = Math.abs(totalTA)
    if (totalTAAbs === 3) {
        winner = board[0] 
        console.log('TA winner')
    }

    totalMA = board[3] + board[4] + board[5]
    totalMAAbs = Math.abs(totalMA)
    if (totalMAAbs === 3) {
        winner = board[3] 
        console.log('MA winner')
    }

    totalBA = board[6] + board[7] + board[8]
    totalBAAbs = Math.abs(totalBA)
    if (totalBAAbs === 3) {
        winner = board[6] 
        console.log('BA winner')
    }

    totalTLD = board[0] + board[4] + board[8]
    totalTLDAbs = Math.abs(totalTLD)
    if (totalTLDAbs === 3) {
        winner = board[0] 
        console.log('TLD winner')
    }

    totalTRD = board[2] + board[4] + board[6]
    totalTRDAbs = Math.abs(totalTRD)
    if (totalTRDAbs === 3) {
        winner = board[2] 
        console.log('TRD winner')
    }

// 5.7) If there's no winner, check if there's a tie:
   // winner = getWinner(cellId)

    // 5.7.1) Set winner to 'T' if there are no more nulls in the board array.
    let idx = 0

    let anyZeros = false
    
    board.forEach(function(cell) {
    console.log('inside forEach zero checker')    
        if (cell === 0) {
            anyZeros = true 
            console.log('anyZeros is', anyZeros)
        } 
    })
    if (anyZeros === false) {
        winner = 'T'
    }
    anyZeros = false
// 5.8) All state has been updated, so render the state to the page (step 4.2).
    console.log('board: ', board)
    render()
}
// 6) Handle a player clicking the replay button
//6.1) Do steps 4.1 (initialize the state variables) and 4.2 (render).

function renderControls() {
    playAgainButton.style.visibility = winner ? 'visible' : 'hidden'
}

document.getElementById('cells').addEventListener('click', handleClick)
playAgainButton.addEventListener('click', init)