'use client';

import { useState } from 'react';

export default function NumberGuessingGame() {
  const numberToGuess = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(5);

  const handleGuess = () => {
    const myGuess = parseInt(guess);
    if (isNaN(myGuess) || myGuess < 50 || myGuess > 100) {
      setMessage('Please enter a valid number between 50 and 100.');
      return;
    }

    if (myGuess === numberToGuess) {
      setMessage(`🎉 Congratulations! You guessed the number ${numberToGuess} correctly!`);
    } else {
      if (attempts - 1 === 0) {
        setMessage(`😢 Game Over! The correct number was ${numberToGuess}.`);
      } else {
        setMessage(myGuess > numberToGuess ? '📈 Too high! Try again.' : '📉 Too low! Try again.');
        setAttempts(attempts - 1);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-700">🎮 Number Guessing Game</h1>
        <p className="text-gray-500 mt-2">Guess a number between 50 and 100! You have {attempts} attempts left.</p>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="mt-4 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your guess"
        />
        <button
          onClick={handleGuess}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Submit Guess
        </button>
        {message && <p className="mt-4 font-semibold text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
