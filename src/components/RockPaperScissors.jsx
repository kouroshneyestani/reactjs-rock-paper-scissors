import React, { useState } from "react";

function RockPaperScissors() {
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState("");

    const choices = ["rock", "paper", "scissors"];

    const handleUserChoice = (choice) => {
        setUserChoice(choice);
        const computerChoice =
            choices[Math.floor(Math.random() * choices.length)];
        setComputerChoice(computerChoice);
        determineWinner(choice, computerChoice);
    };

    const determineWinner = (user, computer) => {
        if (user === computer) {
            setResult("It's a tie!");
        } else if (
            (user === "rock" && computer === "scissors") ||
            (user === "paper" && computer === "rock") ||
            (user === "scissors" && computer === "paper")
        ) {
            setResult("You win!");
        } else {
            setResult("You lose!");
        }
    };

    return (
        <div>
            <h1>Rock-Paper-Scissors</h1>
            <div>
                <button onClick={() => handleUserChoice("rock")}>Rock</button>
                <button onClick={() => handleUserChoice("paper")}>Paper</button>
                <button onClick={() => handleUserChoice("scissors")}>
                    Scissors
                </button>
            </div>
            {userChoice && computerChoice && (
                <div>
                    <p>Your choice: {userChoice}</p>
                    <p>Computer's choice: {computerChoice}</p>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}

export default RockPaperScissors;
