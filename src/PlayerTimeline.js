import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Timeline = styled.div`
  display: flex;
  flex-grow: 1;
  margin-right: 1rem;
`;

const Time = styled.span`
  width: 37px;
  font-size: 0.8rem;
  text-align: center;

  &:first-child {
    margin-right: 0.5rem;
  }

  &:last-child {
    margin-left: 0.5rem;
  }
`;

const Range = styled.input`
  flex-grow: 1;
`;

class PlayerTimeline extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // @Todo: This seems a bit glitchy when the tune is currently playing. It
    // sometimes jumps back to its prevState timePassed value before then
    // jumping to where the user selected
    this.props.setProgress(parseInt(event.target.value, 10), true);
  }

  render() {
    const formatTime = time =>
      new Date(time * 1000).toISOString().substr(14, 5);

    return (
      <Timeline>
        <Time>{formatTime(this.props.progress.timePassed)}</Time>
        <Range
          type="range"
          value={this.props.progress.timePassed}
          min="0"
          max={this.props.duration}
          onChange={this.handleChange}
        />
        <Time>{formatTime(this.props.duration)}</Time>
      </Timeline>
    );
  }
}

PlayerTimeline.propTypes = {
  progress: PropTypes.shape({
    timePassed: PropTypes.number.isRequired,
    seek: PropTypes.bool.isRequired,
  }).isRequired,
  duration: PropTypes.number,
  setProgress: PropTypes.func.isRequired,
};
PlayerTimeline.defaultProps = {
  duration: null,
};

export default PlayerTimeline;
