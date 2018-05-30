import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faStepBackward from '@fortawesome/fontawesome-free-solid/faStepBackward';
import faStepForward from '@fortawesome/fontawesome-free-solid/faStepForward';
import PlayerPlayPauseButton from './PlayerPlayPauseButton';
import Button from './theme/Button';

const Buttons = styled.div`
  display: flex;
  margin-right: 1rem;
`;

function PlayerButtons({
  playing,
  handlePrevious,
  handlePlay,
  handlePause,
  handleNext,
}) {
  return (
    <Buttons>
      <Button onClick={handlePrevious}>
        <FontAwesomeIcon icon={faStepBackward} />
      </Button>
      <PlayerPlayPauseButton
        playing={playing}
        handlePlay={handlePlay}
        handlePause={handlePause}
      />
      <Button onClick={handleNext}>
        <FontAwesomeIcon icon={faStepForward} />
      </Button>
    </Buttons>
  );
}

PlayerButtons.propTypes = {
  playing: PropTypes.bool.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handlePlay: PropTypes.func.isRequired,
  handlePause: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default PlayerButtons;
