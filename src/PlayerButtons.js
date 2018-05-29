import React from 'react';
import PropTypes from 'prop-types';

function PlayerButtons({
  handlePrevious,
  handlePlay,
  handlePause,
  handleNext,
}) {
  return (
    <div>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

PlayerButtons.propTypes = {
  handlePrevious: PropTypes.func.isRequired,
  handlePlay: PropTypes.func.isRequired,
  handlePause: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default PlayerButtons;
