// Get game buttons, reset button, and result elements
const buttons = document.querySelectorAll(".game-button");
const resetButton = document.querySelector("#reset-button");
const roundResultText = document.querySelector("#round-result-text");
const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");

// Add event listeners to game buttons
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const playerChoice = button.dataset.choice;
        playRound(playerChoice);
    });
});

// Initialize scores 
let totalPlayerScore = 0;
let totalComputerScore = 0;

// Function to play a round of the game
function playRound(playerChoice) {
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
}










