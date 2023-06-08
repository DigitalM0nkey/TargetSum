import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {View, StyleSheet, Button, Text} from 'react-native';
import shuffle from 'lodash.shuffle';
import RandomNumber from './RandomNumber';

const Game = ({
  randomNumberCount,
  initalSeconds,
  onPlayAgain,
  keepScore,
  onResetScore,
  score,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(initalSeconds);
  const [randomNumbers] = useState(
    Array.from({length: randomNumberCount}).map(
      () => 1 + Math.floor(10 * Math.random()),
    ),
  );
  const [shuffledRandomNumbers] = useState(shuffle(randomNumbers));
  const [target] = useState(
    randomNumbers
      .slice(0, randomNumberCount - 2)
      .reduce((acc, curr) => acc + curr, 0),
  );
  const [gameStatus, setGameStatus] = useState('PLAYING');

  useEffect(() => {
    if (remainingSeconds > 0) {
      const timerId = setTimeout(() => {
        setRemainingSeconds(remainingSeconds - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const isNumberSelected = numberIndex => {
    return selectedIds.indexOf(numberIndex) >= 0;
  };

  const selectNumber = numberIndex => {
    setSelectedIds([...selectedIds, numberIndex]);
  };

  useEffect(() => {
    const sumSelected = selectedIds.reduce((acc, curr) => {
      return acc + shuffledRandomNumbers[curr];
    }, 0);
    if (gameStatus !== 'PLAYING') {
      setRemainingSeconds(0);
      return;
    }
    if (remainingSeconds === 0) {
      setGameStatus('LOST');
      keepScore('LOST');
      return;
    }
    if (sumSelected < target) {
      setGameStatus('PLAYING');
      return;
    }
    if (sumSelected === target) {
      setGameStatus('WON');
      keepScore('WON');
      return;
    }
    if (sumSelected > target) {
      setGameStatus('LOST');
      keepScore('LOST');
      return;
    }
  }, [
    gameStatus,
    remainingSeconds,
    selectedIds,
    target,
    shuffledRandomNumbers,
    keepScore,
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <Text>Time Remaining: {remainingSeconds}</Text>
      <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
        {target}
      </Text>
      <View style={styles.randomContainer}>
        {shuffledRandomNumbers.map((randomNumber, index) => (
          <RandomNumber
            key={index}
            id={index}
            number={randomNumber}
            isDisabled={isNumberSelected(index) || gameStatus !== 'PLAYING'}
            onPress={selectNumber}
          />
        ))}
      </View>
      {gameStatus !== 'PLAYING' && (
        <Button title="Play Again" onPress={onPlayAgain} />
      )}
      <Button title="Reset Score" onPress={onResetScore} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dffd',
    paddingTop: 30,
  },

  target: {
    fontSize: 50,
    backgroundColor: '#aaa',
    margin: 50,
    textAlign: 'center',
  },

  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  STATUS_PLAYING: {
    backgroundColor: '#bbb',
  },

  STATUS_WON: {
    backgroundColor: 'green',
  },

  STATUS_LOST: {
    backgroundColor: 'red',
  },
});

Game.propTypes = {
  randomNumberCount: PropTypes.number.isRequired,
  initalSeconds: PropTypes.number.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  keepScore: PropTypes.func.isRequired,
  onResetScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default Game;
