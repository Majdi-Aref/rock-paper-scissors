// Get game buttons, reset button, and result elements
let gameButtons = document.querySelectorAll(".game-button");
let resetButton = document.querySelector("#reset-button");
let roundResultText = document.querySelector("#round-result-text");
let playerScore = document.querySelector("#player-score");
let computerScore = document.querySelector("#computer-score");

// Initialize scores and game over variable
let totalPlayerScore = 0;
let totalComputerScore = 0;
let gameOver = false;

/** Function to initialize game buttons
 * 
 * This function appends an event listener to the 3 game buttons (rock, paper, and scissors 
 * buttons); as soon as any of those 3 game buttons is clicked. 
 * Then the function will check if the game is over or not by means of the boolean variable, 
 * gameOver. 
 * If the gameOver varialbe is true, this means that either a player or the computer 
 * has already won the game by winning 10 rounds; 
 * in this case the function will halt until a player presses the "reset and play again" 
 * button" to play a new game. 
 * If gameOver is false, the funciton will proc
 * 
 * @param {*} gameButton 
 */
function initializeGameButtons(gameButton) {
    gameButton.addEventListener("click", function () {
        if (gameOver === false) {
            const playerChoice = gameButton.dataset.choice;
            playRound(playerChoice);
        }
    });
}

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
}

function determineWinner(playerChoice, computerChoice) {
    let result;
    if (computerChoice === playerChoice) {
        result = "Tie";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        totalPlayerScore++;
        result = "You win!";
    } else {
        totalComputerScore++;
        result = "Computer wins!";
    }
    return result;
}

function updateRoundResultText(playerChoice, computerChoice, result) {
    roundResultText.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
}

function updateScores() {
    playerScore.textContent = totalPlayerScore;
    computerScore.textContent = totalComputerScore;
}

function checkGameOver() {
    if (totalPlayerScore === 10) {
        roundResultText.textContent = `You have won 10 rounds, you are victorious! Please press the "Reset & Play Again" button below to start a new game.`;
        gameOver = true;
        resetButton.style.display = "initial";
    } else if (totalComputerScore === 10) {
        roundResultText.textContent = `The computer has won 10 rounds, the computer is victorious! Please press the "Reset & Play Again" button below to start a new game.`;
        gameOver = true;
        resetButton.style.display = "initial";
    }
}

function playRound(playerChoice) {
    let computerChoice = getComputerChoice();
    let result = determineWinner(playerChoice, computerChoice);
    updateRoundResultText(playerChoice, computerChoice, result);
    updateScores();
    checkGameOver();
}

// Function to reset the game 
function resetGame() {
    totalPlayerScore = 0;
    playerScore.textContent = totalPlayerScore;
    totalComputerScore = 0;
    computerScore.textContent = totalComputerScore;
    roundResultText.textContent = "";
    gameOver = false;
    resetButton.style.display = "none";
}

// Function to start a game 
function initializeGame() {
    gameButtons.forEach(initializeGameButtons);
    resetButton.addEventListener("click", resetGame);
}

window.addEventListener("DOMContentLoaded", initializeGame);


