// Get game buttons, reset button, and result elements
const buttons = document.querySelectorAll(".game-button");
const resetButton = document.querySelector("#reset-button");
const roundResultText = document.querySelector("#round-result-text");
const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");

// Add event listeners to game buttons
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (gameOver === false) {
            const playerChoice = button.dataset.choice;
            playRound(playerChoice);
        }
    });
});

// Initialize scores and game over variable
let totalPlayerScore = 0;
let totalComputerScore = 0;
let gameOver = false;

// Function to play a round of the game
function playRound(playerChoice) {

    // Getting computer choice
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    // Determine winner
    let result;
    if (computerChoice === playerChoice) {
        result = "Tie";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "You win!";
        totalPlayerScore++;
    } else {
        result = "Computer wins!";
        totalComputerScore++;
    }

    // Update round result text and scores
    roundResultText.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
    playerScore.textContent = totalPlayerScore;
    computerScore.textContent = totalComputerScore;

    // Check if either player has won 10 rounds
    if (totalPlayerScore === 10) {
        roundResultText.textContent = `You have won 10 rounds! You are victorious! Please press the "Reset & Play Again" button below to start a new game.`;
        gameOver = true;
    } else if (totalComputerScore === 10) {
        roundResultText.textContent = `The computer has won 10 rounds! The computer is victorious! Please press the "Reset & Play Again" button below to start a new game.`;
        gameOver = true;
    }
}

// Add event listener to reset button 
resetButton.addEventListener("click", resetGame);

// Function to reset the game 
function resetGame() {
    totalPlayerScore = 0;
    playerScore.textContent = totalPlayerScore;
    totalComputerScore = 0;
    computerScore.textContent = totalComputerScore;
    roundResultText.textContent = "";
    gameOver = false;
}
