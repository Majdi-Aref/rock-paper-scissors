// Get game buttons, reset button, and result elements
let gameButtons = document.querySelectorAll(".game-button");
let resetButton = document.querySelector("#reset-button");
let roundResultText = document.querySelector("#round-result-text");
let finalResultText = document.querySelector("#final-result-text");
let playerScore = document.querySelector("#player-score");
let computerScore = document.querySelector("#computer-score");

// Initialize scores and game over variable
let totalPlayerScore = 0;
let totalComputerScore = 0;
let gameOver = false;

/** 
 * Function to initialize game buttons
 * @param {*} gameButton As the function initializeGame() below calls this 
 * function, this parameter (gameButton) will be defined and passed to this 
 * function.
 */
function initializeGameButtons(gameButton) {
    gameButton.addEventListener("click", function () {
        if (gameOver === false) {
            let playerChoice = gameButton.dataset.choice;
            playRound(playerChoice);
        }
    });
}

/**
 * Function to play a game's round.
 * This function is the main function of the game and calls 5 functions.
 * @param {*} playerChoice This parameter is defined in this function because
 * it is already declared and passed to this function in the last function: 
 * initializeGameButtons(gameButton).
 */
function playRound(playerChoice) {
    let computerChoice = getComputerChoice();
    let result = determineRoundResult(playerChoice, computerChoice);
    updateRoundResultText(playerChoice, computerChoice, result);
    updateScores(result);
    announceWinner();
    checkGameOver();
}

/** 
 * Function to get a computer's choice
 * In this function, the computer choice is 100% unbiased.
 * @returns At the end of this function, a computer' choice will be retured 
 * because it must be used outside this function's scope.
 */
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
}

/** Function to determine the result of a game's round
 * @param {string} playerChoice 
 * @param {string} computerChoice 
 * @returns This is because the "result" variable must be used outside this 
 * function.
 */
function determineRoundResult(playerChoice, computerChoice) {
    let result;
    if (computerChoice === playerChoice) {
        result = "it is a tie.";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "you won this round.";
    } else {
        result = "the computer won this round.";
    }
    return result;
}

/**
 * Function to update the text message of the result of a game's round
 * @param {string} playerChoice 
 * @param {string} computerChoice 
 * @param {string} result
 */
function updateRoundResultText(playerChoice, computerChoice, result) {
    roundResultText.textContent = `You chose ${playerChoice}, the computer chose ${computerChoice}; ${result}`;
}

/**
 * Function to update the player's score and the computer's score
 * @param {string} result
 */
function updateScores(result) {
    if (result === "you won this round.") {
        totalPlayerScore++;
        playerScore.textContent = totalPlayerScore;
    }
    if (result === "the computer won this round.") {
        totalComputerScore++;
        computerScore.textContent = totalComputerScore;
    }
}

/**
 * Function to announce the winner of the game
 */
function announceWinner() {
    if (totalPlayerScore === 10) {
        finalResultText.textContent = `You won the game! Please press the "Reset & Play Again" button below to start a new game.`;
    }
    else if (totalComputerScore === 10) {
        finalResultText.textContent = `The computer won the game! Please press the "Reset & Play Again" button below to start a new game.`;
    }
}

/**
 * Function to check if the game is over
 * The "Reset and play again" button is already hidden by means of a CSS rule.
 * If the game is over, the function "initializeGameButtons" will not proceed, 
 * the game buttons will be disabled, and the "Reset and play again" button 
 * will appear.
 */
function checkGameOver() {
    if (
        (totalPlayerScore === 10) ||
        (totalComputerScore === 10)
    ) {
        gameButtons.forEach(gameButton => {
            gameButton.disabled = true;
        });
        gameOver = true;
        resetButton.style.display = "initial";
    }
}

/**
 * Function to reset the game
 * This will reset all scores to zero and all texts to empty.
 * The "Reset and play again" button will be hidden.
 * The gameOver variable will be set to "false", which will re-activate the 
 * function "initializeGameButtons(gameButton)".
 */
function resetGame() {
    totalPlayerScore = 0;
    playerScore.textContent = totalPlayerScore;
    totalComputerScore = 0;
    computerScore.textContent = totalComputerScore;
    roundResultText.textContent = "";
    finalResultText.textContent = "";
    gameOver = false;
    resetButton.style.display = "none";
    gameButtons.forEach(gameButton => {
        gameButton.disabled = false;
    });
}

/**
 * Function to start a game
 * This function calls two functions: initializeGameButtons(button) and 
 * resetGame()
 */
function initializeGame() {
    gameButtons.forEach(initializeGameButtons);
    resetButton.addEventListener("click", resetGame);
}

/**
 * Calling the function initializeGame() only when the DOM content is fully 
 * loaded.
 */
window.addEventListener("DOMContentLoaded", initializeGame);


