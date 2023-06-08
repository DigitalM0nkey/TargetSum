import React, {useState} from 'react';
import Game from './Game';

const App = () => {
  const [gameId, setGameId] = useState(1);
  const [score, setScore] = useState(0);

  const resetGame = () => {
    setGameId(gameId + 1);
  };

  const resetScore = () => {
    setScore(0);
  };

  const keepScore = result => {
    if (result === 'WON') {
      setScore(score + 1);
    }
    if (result === 'LOST') {
      setScore(score - 1);
    }
  };

  return (
    <Game
      key={gameId}
      onPlayAgain={resetGame}
      onResetScore={resetScore}
      keepScore={keepScore}
      score={score}
      randomNumberCount={8}
      initalSeconds={10}
    />
  );
};

export default App;
