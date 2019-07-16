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
    this.state = {
      prevPlaying: null,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown() {
    const { playing, pauseTune } = this.props;

    this.setState({
      prevPlaying: playing,
    });

    pauseTune();
  }

  handleChange(event) {
    const { setProgress } = this.props;

    setProgress(parseInt(event.target.value, 10), true);
  }

  handleMouseUp() {
    const { playTune } = this.props;
    const { prevPlaying } = this.state;

    if (prevPlaying) {
      playTune();
    }
  }

  render() {
    const { progress, duration, loaded } = this.props;
    const formatTime = time =>
      new Date(time * 1000).toISOString().substr(14, 5);

    return (
      <Timeline>
        <Time>{formatTime(progress.timePassed)}</Time>
        <Range
          type="range"
          value={progress.timePassed}
          min="0"
          max={duration}
          disabled={!loaded}
          onMouseDown={this.handleMouseDown}
          onChange={this.handleChange}
          onMouseUp={this.handleMouseUp}
        />
        <Time>{formatTime(duration)}</Time>
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
  loaded: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  setProgress: PropTypes.func.isRequired,
  playTune: PropTypes.func.isRequired,
  pauseTune: PropTypes.func.isRequired,
};
PlayerTimeline.defaultProps = {
  duration: null,
};

export default PlayerTimeline;
