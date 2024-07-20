import React, { useState, useEffect } from "react";
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

const CountdownText = styled.p`
    font-size: 24px;
    font-weight: bold;
`;

const ResultText = styled.p`
    font-size: 18px;
`;

// Choices component for rendering game buttons and handling user choices
function Choices({ onChoose }) {
    return (
        <div>
            <Button onClick={() => onChoose("rock")}>Rock</Button>
            <Button onClick={() => onChoose("paper")}>Paper</Button>
            <Button onClick={() => onChoose("scissors")}>Scissors</Button>
        </div>
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

    return (
        <Container>
            <h1>Rock-Paper-Scissors</h1>
            {!userChoice && !countdown && (
                <Choices onChoose={handleUserChoice} />
            )}
            {countdown > 0 && <CountdownText>{countdown}</CountdownText>}
            {countdown === 0 && <CountdownText>Fight!</CountdownText>}
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
        </Container>
    );
}

export default RockPaperScissors;
