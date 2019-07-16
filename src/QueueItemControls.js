import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import PlayerPlayPauseButton from './PlayerPlayPauseButton';
import Button from './theme/Button';

const Buttons = styled.div`
  margin-left: 0.5rem;
`;

class QueueItemControls extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSkipClick = this.handleSkipClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleSkipClick() {
    const { skipToTune, id } = this.props;

    skipToTune(id);
  }

  handleRemoveClick() {
    const { removeTune, id } = this.props;

    removeTune(id);
  }

  render() {
    const { first, loaded, playing, togglePlay } = this.props;

    return (
      <Buttons>
        {first ? (
          <PlayerPlayPauseButton
            loaded={loaded}
            playing={playing}
            togglePlay={togglePlay}
          />
        ) : (
          <Button aria-label="Play" onClick={this.handleSkipClick}>
            <FontAwesomeIcon icon={faPlay} />
          </Button>
        )}
        <Button aria-label="Remove" onClick={this.handleRemoveClick}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Buttons>
    );
  }
}
QueueItemControls.propTypes = {
  id: PropTypes.string.isRequired,
  first: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
  removeTune: PropTypes.func.isRequired,
  skipToTune: PropTypes.func.isRequired,
};

export default QueueItemControls;
