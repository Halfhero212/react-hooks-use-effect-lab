import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Check if timeRemaining is greater than 0
    if (timeRemaining > 0) {
      // Set up the timer to decrease timeRemaining every second
      const timerId = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);

      // Cleanup function to clear the timer
      return () => clearTimeout(timerId);
    } else {
      // When timeRemaining hits 0, reset to 10 and call onAnswered with false
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]); // Dependencies: timeRemaining and onAnswered

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset the timer for the next question
    onAnswered(isCorrect); // Notify parent component whether the answer was correct
  }
}

export default Question;
