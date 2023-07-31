/*----- constants -----*/
/* 1) Define required constants:
  1.1) Define a colors object with keys of 'null' (when the square is empty), and players 1 & -1. The value assigned to each key represents the color to display for an empty square (null), player 1 and player -1. */

const COLORS = {
    'null': (null), 
    1: 'X', 
    '-1': 'O'
}
/* 1.2) Define the 8 possible winning combinations, each containing three indexes of the board that make a winner if they hold the same player value. */

const leftDownWin = [
    [1, 0, 0], 
    [1, 0, 0], 
    [1, 0, 0]
]
const middleDownWin = [
    [0, 1, 0], 
    [0, 1, 0], 
    [0, 1, 0]
]
const rightDownWin = [
    [0, 0, 1], 
    [0, 0, 1], 
    [0, 0, 1]
]
const topAcrossWin = [
    [1, 1, 1], 
    [0, 0, 0], 
    [0, 0, 0]
]
const middleAcrossWin = [
    [0, 0, 0], 
    [1, 1, 1], 
    [0, 0, 0]
]
const bottomAcrossWin = [
    [0, 0, 0], 
    [0, 0, 0], 
    [1, 1, 1]
]
const topLeftDiagonalWin = [
    [1, 0, 0], 
    [0, 1, 0], 
    [0, 0, 1]
]
const topRightDiagonalWin = [
    [0, 0, 1], 
    [0, 1, 0], 
    [1, 0, 0]
]

/*----- state variables -----*/
/* 2) Define required variables used to track the state of the game:
  2.1) Use a board array to represent the squares. */

let board  // an array of 3 nested arrays that will track who made which moves and where

 /* 2.2) Use a turn variable to remember whose turn it is. */

let turn // will be a value of 1 or -1 (1 || -1)

/* 2.3) Use a winner variable to represent three different possibilities - player that won, a tie, or game in play. */

let winner // null || 1 || -1 || 'T'

/*----- cached elements  -----*/
/* 3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant: (grabbing html elements and saving them to variables for later use)
  3.1) Store the 9 elements that represent the squares on the page.*/

const messageEl = document.querySelector('h3')

const playAgainButton = document.querySelector('button')

const gameCellEls = [...document.querySelectorAll('#cells > div')]

// console.log('This is the message element.', messageEl)
// console.log('This is the play again button.', playAgainButton)
// console.log('This is the game cell element.', gameCellEls)

/*----- functions -----*/
/* 4) Upon loading, the app should:
  4.1) Initialize the state variables:
    4.1.1) Initialize the board array to 9 nulls to represent empty squares. The 9 elements will "map" to each square, where index 0 maps to the top-left square and index 8 maps to the bottom-right square.*/

init()

function init() {
    // board = Array(9).fill(null)
    board = ['', '', '', '', '', '', '', '', '']
    // board = [
    //     [0, 1, 2], 
    //     [3, 4, 5], 
    //     [6, 7, 8]
    // ] ?

    /* 4.1.2) Initialize whose turn it is to 1 (player 'X'). Player 'O' will be represented by -1.*/

    turn = 1

    /* 4.1.3) Initialize winner to null to represent that there is no winner or tie yet. Winner will hold the player value (1 or -1) if there's a winner. Winner will hold a 'T' if there's a tie. */

    winner = null

    render()
}
  /* 4.2) Render those state variables to the page:
    4.2.1) Render the board:
      4.2.1.1) Loop over each of the 9 elements that represent the squares on the page, and for each iteration:*/
         /* 4.2.1.1.2) Use the index of the iteration to access the mapped value from the board array.*/
         /* 4.3.1.1.3) Set the background color of the current element by using the value as a key on the colors lookup object (constant).*/

function renderBoard() {
    board.forEach((colArr, colIdx) => {
        // console.log('this is colArr', colArr)
        // console.log('this is colIdx', colIdx)
        // console.log('=======================')
        colArr.forEach((cellVal, rowIdx) => {
            // console.log('this is cellVal', cellVal)
            // console.log('this is rowIdx', rowIdx)
            const cellId = `c${colIdx}r${rowIdx}`
            //console.log('this is cellId', cellId)
            const cellEl = document.getElementById(cellId)
            //console.log('this is cellEl', cellEl)
            cellEl.style.backgroundColor = COLORS[cellVal]
        })
    })
}
    /* 4.2.2) Render a message:
      /* 4.2.2.1) If winner has a value other than null (game still in progress), render whose turn it is - use the color name for the player, converting it to upper case.*/
function renderMessage() {
      /* 4.2.2.2) If winner is equal to 'T' (tie), render a tie message.*/
      /* 4.2.2.3) Otherwise, render a congratulatory message to which player has won - use the color name for the player, converting it to uppercase.*/
    if (winner === 'T') {
        messageEl.innerText = "It's a TIE GAME!!!"
    } else if (winner) {
        messageEl.innerHTML = `
        <span style="color: ${COLORS[winner]}">
            ${COLORS[winner].toUpperCase()}
            </span> WINS!!!
        `
    } else {
        messageEl.innerHTML = `
        <span style="color: ${COLORS[turn]}">
        ${COLORS[turn].toUpperCase()}
        </span>'s TURN!
        `
    }
}

/* 4.3) Wait for the user to click a square */

function render() {
    // render our board
    renderBoard()
    // render our messages
    renderMessage()
    // render our controls
    renderControls()
}

/*----- event listeners -----*/
/* 5) Handle a player clicking a square:
  5.1) Obtain the index of the square that was clicked by either:
    5.1.1) "Extracting" the index from an id assigned to the element in the HTML, or
    5.1.2) Looping through the cached square elements using a for loop and breaking out when the current square element equals the event object's target.
  5.2) If the board has a value at the index, immediately return because that square is already taken.
  5.3) If winner is not null, immediately return because the game is over.
  5.4) Update the board array at the index with the value of turn.
  5.5) Flip turns by multiplying turn by -1 (flips a 1 to -1, and vice-versa).
  5.6) Set the winner variable if there's a winner:
    5.6.1) Loop through the each of the winning combination arrays defined.
    5.6.2) Total up the three board positions using the three indexes in the current combo.
    5.6.3) Convert the total to an absolute value (convert any negative total to positive).
    5.6.4) If the total equals 3, we have a winner! Set winner to the board's value at the index specified by the first index in the combo array. Exit the loop.
  5.7) If there's no winner, check if there's a tie:
    5.7.1) Set winner to 'T' if there are no more nulls in the board array.
  5.8) All state has been updated, so render the state to the page (step 4.2).*/
		
function handleDrop(event) {
    // console.log('target of the click \n', event)
    // needs to relate a click to the column selected
    const colIdx = markerEls.indexOf(event.target)
    // console.log('this is colIdx in handleDrop \n', colIdx)
    // determine if the move is valid, and what to do if it is not
    // we need to assign a value to a specific board element
    const colArr = board[colIdx]
    // console.log('this is colArr', colArr)
    // indexOf returns the first thing it encounters(when we use 0 as the argument)
    const rowIdx = colArr.indexOf(0)
    // if the move is invalid, exit the function
    if (rowIdx === -1) return
    // console.log('this is rowidx', rowIdx)
    // assign a value using these two variabls(colArr, rowIdx)
    colArr[rowIdx] = turn
    // change the turn after things have happened
    turn *= -1

    // check for a winner
    winner = getWinner(colIdx, rowIdx)
    
    // render the changes to the board
    render()
}

// checkforawinner() -> checks for win conditions(horizontal, vertical, diagonal) (we might want multiple functions for this)

// break check for winner up into different steps
//  -> checkAdjacentTiles
function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    const player = board[colIdx][rowIdx]
    let count = 0

    // use a while loop to check the spaces around the played tile
    colIdx += colOffset
    rowIdx += rowOffset
    // we need to keep within the board
    // and only count if the disc matches the player
    while (
        board[colIdx] !== undefined && 
        board[colIdx][rowIdx] !== undefined &&
        board[colIdx][rowIdx] === player
    ) {
        count++
        colIdx += colOffset
        rowIdx += rowOffset
    }
    console.log('the count in countAdj', count)
    return count
}
// checkForHorizontalWin
function checkHorizontalWinner(colIdx, rowIdx) {
    // going to the left
    const adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0)
    // going to the right
    const adjCountRight = countAdjacent(colIdx, rowIdx, 1, 0)

    return adjCountLeft + adjCountRight >= 3 ? board[colIdx][rowIdx] : null
}
// checkForVerticalWin
function checkVerticalWinner(colIdx, rowIdx) {
    // go from N to S
    // 0 = not changing our column
    // -1 = moving south down the column
    return countAdjacent(colIdx, rowIdx, 0, -1) === 3 ? board[colIdx][rowIdx] : null
}
// checkForDiagonalWin --> two directions to check NWSE & NESW
function checkDiagonalWinNWSE(colIdx, rowIdx) {
    // we'll use countAdjacent and move our row and column this time
    // go NW
    const adjCountNW = countAdjacent(colIdx, rowIdx, -1, 1)
    // go SE
    const adjCountSE = countAdjacent(colIdx, rowIdx, 1, -1)

    return adjCountNW + adjCountSE >= 3 ? board[colIdx][rowIdx] : null
}

function checkDiagonalWinNESW(colIdx, rowIdx) {
        // we'll use countAdjacent and move our row and column this time
    // go NW
    const adjCountNE = countAdjacent(colIdx, rowIdx, 1, 1)
    // go SE
    const adjCountSW = countAdjacent(colIdx, rowIdx, -1, -1)

    return adjCountNE + adjCountSW >= 3 ? board[colIdx][rowIdx] : null
}
// call all of these with one big check a winner function
function getWinner(colIdx, rowIdx) {
    console.log('this is rowidx - in getWinner', rowIdx)
    console.log('this is colidx - in getWinner', colIdx)
    console.log('this is the board', board)
    return (
        checkVerticalWinner(colIdx, rowIdx) || 
        checkHorizontalWinner(colIdx, rowIdx) ||
        checkDiagonalWinNESW(colIdx, rowIdx) ||
        checkDiagonalWinNWSE(colIdx, rowIdx)
    )
}

/*6) Handle a player clicking the replay button:
  6.1) Do steps 4.1 (initialize the state variables) and 4.2 (render).*/
function renderControls() {
    playAgainButton.style.visibility = winner ? 'visible' : 'hidden'
    // change visibility of our marker buttons
    // markerEls.forEach((markerEl, colIdx) => {
    //     const hideMarker = !board[colIdx].includes(0) || winner

    //     markerEl.style.visibility = hideMarker ? 'hidden' : 'visible'

    // })
}

