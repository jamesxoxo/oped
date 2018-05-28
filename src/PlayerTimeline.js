import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlayerTimeline extends Component {
  constructor(props) {
    super(props);

    this.handleProgressChange = this.handleProgressChange.bind(this);
  }

  handleProgressChange(event) {
    // @Todo: This seems a bit glitchy when the tune is currently playing. It
    // sometimes jumps back to its prevState timePassed value before then
    // jumping to where the user selected
    this.props.handleProgressChange(parseInt(event.target.value, 10), true);
  }

  render() {
    return (
      <input
        type="range"
        value={this.props.progress.timePassed}
        min="0"
        max={this.props.duration}
        onChange={this.handleProgressChange}
      />
    );
  }
}

PlayerTimeline.propTypes = {
  progress: PropTypes.shape().isRequired,
  duration: PropTypes.number,
  handleProgressChange: PropTypes.func.isRequired,
};
PlayerTimeline.defaultProps = {
  duration: null,
};

export default PlayerTimeline;
