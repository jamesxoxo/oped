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
  loaded,
  playing,
  previousTune,
  togglePlay,
  nextTune,
}) {
  return (
    <Buttons>
      <Button onClick={previousTune}>
        <FontAwesomeIcon icon={faStepBackward} />
      </Button>
      <PlayerPlayPauseButton
        loaded={loaded}
        playing={playing}
        togglePlay={togglePlay}
      />
      <Button onClick={nextTune}>
        <FontAwesomeIcon icon={faStepForward} />
      </Button>
    </Buttons>
  );
}

PlayerButtons.propTypes = {
  loaded: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  previousTune: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  nextTune: PropTypes.func.isRequired,
};

export default PlayerButtons;
