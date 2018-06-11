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
    this.setState({
      prevPlaying: this.props.playing,
    });

    this.props.pauseTune();
  }

  handleChange(event) {
    this.props.setProgress(parseInt(event.target.value, 10), true);
  }

  handleMouseUp() {
    if (this.state.prevPlaying) {
      this.props.playTune();
    }
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
          disabled={!this.props.loaded}
          onMouseDown={this.handleMouseDown}
          onChange={this.handleChange}
          onMouseUp={this.handleMouseUp}
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
