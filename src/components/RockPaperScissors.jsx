import React, { useState } from "react";
import styled from "styled-components";

// Styled components
const Container = styled.div`
    text-align: center;
    padding: 20px;
`;

const Button = styled.button`
    margin: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
`;

const Image = styled.img`
    width: 100px;
    margin: 10px;
`;

const ResultText = styled.p`
    font-size: 18px;
`;

// Choices component for rendering game buttons and handling user choices
function Choices({ setUserChoice, setComputerChoice, setResult }) {
    const choices = ["rock", "paper", "scissors"];

    // Determines the winner based on user and computer choices
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

    // Handles user choice, generates a random computer choice, and determines the winner
    const handleUserChoice = (choice) => {
        setUserChoice(choice);
        const computerChoice =
            choices[Math.floor(Math.random() * choices.length)];
        setComputerChoice(computerChoice);
        determineWinner(choice, computerChoice);
    };

    return (
        <div>
            <Button onClick={() => handleUserChoice("rock")}>Rock</Button>
            <Button onClick={() => handleUserChoice("paper")}>Paper</Button>
            <Button onClick={() => handleUserChoice("scissors")}>
                Scissors
            </Button>
        </div>
    );
}

// Main component for the Rock-Paper-Scissors game
function RockPaperScissors() {
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState("");

    // Renders the choice image based on the selected choice
    const renderChoiceImage = (choice) => {
        switch (choice) {
            case "rock":
                return "Rock";
            case "paper":
                return "Paper";
            case "scissors":
                return "Scissors";
            default:
                return null;
        }
    };

    return (
        <Container>
            <h1>Rock-Paper-Scissors</h1>
            <Choices
                setUserChoice={setUserChoice}
                setComputerChoice={setComputerChoice}
                setResult={setResult}
            />
            {userChoice && computerChoice && (
                <div>
                    <div>
                        <h2>Your choice:</h2>
                        {renderChoiceImage(userChoice)}
                    </div>
                    <div>
                        <h2>Computer's choice:</h2>
                        {renderChoiceImage(computerChoice)}
                    </div>
                    <ResultText>{result}</ResultText>
                </div>
            )}
        </Container>
    );
}

export default RockPaperScissors;
