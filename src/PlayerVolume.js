import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlayerVolume extends Component {
  constructor(props) {
    super(props);

    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleMuteClick = this.handleMuteClick.bind(this);
  }

  handleVolumeChange(event) {
    this.props.handleVolumeChange(parseInt(event.target.value, 10));
  }

  handleMuteClick() {
    if (this.props.volume > 0) {
      this.props.handleVolumeChange(0);
    } else {
      this.props.handleVolumeChange(this.props.prevVolume);
    }
  }

  render() {
    return (
      <div>
        <input
          type="range"
          value={this.props.volume}
          min="0"
          max="100"
          onChange={this.handleVolumeChange}
        />
        <button onClick={this.handleMuteClick}>Mute</button>
      </div>
    );
  }
}

PlayerVolume.propTypes = {
  volume: PropTypes.number.isRequired,
  prevVolume: PropTypes.number,
  handleVolumeChange: PropTypes.func.isRequired,
};

PlayerVolume.defaultProps = {
  prevVolume: null,
};

export default PlayerVolume;
