import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faPause from '@fortawesome/fontawesome-free-solid/faPause';
import Button from './theme/Button';

class PlayerPlayPauseButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.playing) {
      this.props.handlePause();
    } else {
      this.props.handlePlay();
    }
  }

  render() {
    return (
      <Button
        onClick={this.handleClick}
        aria-label={this.props.playing ? 'Pause' : 'Play'}
      >
        <FontAwesomeIcon icon={this.props.playing ? faPause : faPlay} />
      </Button>
    );
  }
}

PlayerPlayPauseButton.propTypes = {
  playing: PropTypes.bool.isRequired,
  handlePlay: PropTypes.func.isRequired,
  handlePause: PropTypes.func.isRequired,
};

export default PlayerPlayPauseButton;
