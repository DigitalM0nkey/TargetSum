import React from 'react';
import PropTypes from 'prop-types';

import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const RandomNumber = ({number, isDisabled, onPress, id}) => {
  const handlePress = () => {
    if (!isDisabled) {
      onPress(id);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.random, isDisabled && styles.disabled]}>
        {number}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  random: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.3,
  },
});

RandomNumber.propTypes = {
  number: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default RandomNumber;
