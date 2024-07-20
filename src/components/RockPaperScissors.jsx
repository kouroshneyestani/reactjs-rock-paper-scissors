import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled components
const Container = styled.div`
    text-align: center;
    padding: 20px;
`;

const CountdownText = styled.p`
    font-size: 24px;
    font-weight: bold;
`;

const ResultText = styled.p`
    font-size: 18px;
`;

const Button = styled.button`
    color: blue;
    cursor: pointer; /* Pointer cursor to indicate clickable button */
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: lightblue; /* Optional: hover effect */
    }
`;

const RestartButton = styled(Button)`
    background-color: #4caf50; /* Green */
    color: white;
    margin-top: 20px;

    &:hover {
        background-color: #45a049; /* Darker green on hover */
    }
`;

const GamePlayButtons = styled.div`
    width: 150px;
    height: 150px; 
    border-radius: 50%;
    display: flex;
    justify-content: center; 
    align-items: center;
    position: fixed;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: auto;
`;

const GamePlayButtonsButton = styled.div`
    width: 60px; 
    height: 60px; 
    border-radius: 50%; 
    background-color: #3498db;
    color: white; 
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer; 
    position: absolute;
    text-align: center;
    font-size: 14px;
    user-select: none;

    &:hover {
        background-color: #2980b9; /* Darker blue on hover */
    }
`;

// Choices component for rendering game buttons and handling user choices
function Choices({ onChoose }) {
    // Rotate and position each child
    const getTransform = (index) => {
        const angle = 120 * index;
        return `
            rotate(${angle}deg) translateX(45px) rotate(-${angle}deg)
        `;
    };

    return (
        <GamePlayButtons>
            <GamePlayButtonsButton
                onClick={() => onChoose("rock")}
                style={{ transform: getTransform(0) }}
                aria-label="Rock"
            >
                Rock
            </GamePlayButtonsButton>
            <GamePlayButtonsButton
                onClick={() => onChoose("paper")}
                style={{ transform: getTransform(1) }}
                aria-label="Paper"
            >
                Paper
            </GamePlayButtonsButton>
            <GamePlayButtonsButton
                onClick={() => onChoose("scissors")}
                style={{ transform: getTransform(2) }}
                aria-label="Scissors"
            >
                Scissors
            </GamePlayButtonsButton>
        </GamePlayButtons>
    );
}

// Main component for the Rock-Paper-Scissors game
function RockPaperScissors() {
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState("");
    const [countdown, setCountdown] = useState(null);

    // Starts countdown and game logic
    const handleUserChoice = (choice) => {
        setUserChoice(choice);
        setCountdown(3); // Start countdown from 3 seconds
    };

    // Countdown effect
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0 && userChoice) {
            const choices = ["rock", "paper", "scissors"];
            const computerChoice =
                choices[Math.floor(Math.random() * choices.length)];
            setComputerChoice(computerChoice);
            determineWinner(userChoice, computerChoice);
        }
        return () => clearInterval(timer);
    }, [countdown, userChoice]);

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

    // Resets the game state
    const handleRestart = () => {
        setUserChoice(null);
        setComputerChoice(null);
        setResult("");
        setCountdown(null);
    };

    return (
        <Container>
            {!userChoice && !countdown && !result && (
                <Choices onChoose={handleUserChoice} />
            )}
            {countdown > 0 && <CountdownText>{countdown}</CountdownText>}
            {countdown === 0 && !result && (
                <CountdownText>Fight!</CountdownText>
            )}
            {userChoice && computerChoice && (
                <div>
                    <div>
                        <h2>Your choice:</h2>
                        {userChoice.charAt(0).toUpperCase() +
                            userChoice.slice(1)}
                    </div>
                    <div>
                        <h2>Computer's choice:</h2>
                        {computerChoice.charAt(0).toUpperCase() +
                            computerChoice.slice(1)}
                    </div>
                    <ResultText>{result}</ResultText>
                </div>
            )}
            {result && (
                <RestartButton onClick={handleRestart}>
                    Restart Game
                </RestartButton>
            )}
        </Container>
    );
}

export default RockPaperScissors;
