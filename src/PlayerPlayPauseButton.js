import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faPause from '@fortawesome/fontawesome-free-solid/faPause';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import Button from './theme/Button';

class PlayerPlayPauseButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { togglePlay } = this.props;

    togglePlay();
  }

  render() {
    const { playing, loaded } = this.props;
    let icon = playing ? faPause : faPlay;

    if (!loaded) {
      icon = faSpinner;
    }

    return (
      <Button
        onClick={this.handleClick}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        <FontAwesomeIcon icon={icon} pulse={icon === faSpinner} />
      </Button>
    );
  }
}
PlayerPlayPauseButton.propTypes = {
  loaded: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
};

export default PlayerPlayPauseButton;
