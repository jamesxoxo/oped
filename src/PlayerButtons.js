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
  previousTune,
  playTune,
  pauseTune,
  nextTune,
}) {
  return (
    <Buttons>
      <Button onClick={previousTune}>
        <FontAwesomeIcon icon={faStepBackward} />
      </Button>
      <PlayerPlayPauseButton
        playing={playing}
        playTune={playTune}
        pauseTune={pauseTune}
      />
      <Button onClick={nextTune}>
        <FontAwesomeIcon icon={faStepForward} />
      </Button>
    </Buttons>
  );
}

PlayerButtons.propTypes = {
  playing: PropTypes.bool.isRequired,
  previousTune: PropTypes.func.isRequired,
  playTune: PropTypes.func.isRequired,
  pauseTune: PropTypes.func.isRequired,
  nextTune: PropTypes.func.isRequired,
};

export default PlayerButtons;
