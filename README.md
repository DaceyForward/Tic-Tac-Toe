# TIC-TAC-TOE 
## Disney's Frozen Edition!!
Inspired by my two-year-old daughter.
## Analyze our App's Funtionality

#### User Stories

As a user...
- I want to be able to have 2 players
- I want to be able to take turns
- I want the game to display an empty tic-tac-toe board when the page is initially displayed
- I want the player to be able to click on one of the nine cells to make a move
- I want each cell to only be played once (once occupied with an X or and O, the cell cannot be played again)
- I want a reset button that will clear the contents of the board
I want to win by getting three cells in a row (horizontally, vertically, or diagonally)

**Bonus User Stories**
- I want to be able to see whose turn it is
- I want to see the winner with a message displayed
- I want to know if there is a tie with a message displayed
- I want to see a fun, personal, and unique style to the game

#### Determine the Overall Design of our App
- Clean, minimalist design and layout
- Turquoise blue Xs and light purple Os
- Grey tic-tac-toe board
    ##### Font: 
    ###### HTML Code
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Borel&display=swap" rel="stylesheet">
    ```
    ###### CSS Code
    ```css
    font-family: 'Borel', cursive;
    ```

## Wireframe of the UI

![layout wireframe](https://i.imgur.com/uRRgMsj.jpg)

High Fidelity
- Working demo
- Buttons are clickable
- Hover effects happen on buttons

Low Fidelity
- Drawing of the app
- Layout of the page
- Header location
- Button location
- Cluttered/crowded sections or empty sections?

## Pseudocode

Overall App Logic
- Page loads with empty tic-tac-toe board
- (Game is started or player chooses color with button?)
- Message displaying whose turn it is shows and switches after each click in a cell on gameboard
- Player hovers over cells (which turn slightly grey when hovered on) then clicks inside cell to complete turn
- Message displays next player's turn
- Next player hovers over cells (which turn slightly grey when hovered on) then clicks inside cell to complete turn
- When a player has clicked inside a cell, that cell is no longer available (not clickable and has no color-change on hover)
- Repeats and continues until all 9 cells are covered (tie) or someone gets three in a row (horizontally, vertically, or diagonally)
- Message displays winner or tie game
- When the message displays, the "play again" button displays at the bottom
- When the play again button is clicked, the board is empty and steps repeat

## Identify the Application's State (Data)
The app needs to remember:
- The color the user has chosen
- Which cell the user has clicked
