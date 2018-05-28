import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

class PlayerAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
    };

    this.handleReady = this.handleReady.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }
  componentDidUpdate() {
    // @Todo: Maybe want to check against some prevProps in here
    const { player } = this.state;

    if (!player) return;

    if (this.props.playing) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }

    if (this.props.progress.seek) {
      player.seekTo(this.props.progress.timePassed);
    }

    player.setVolume(this.props.volume);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleReady(event) {
    this.setState({
      player: event.target,
    });

    this.props.handleReady();
    this.timer = setInterval(() => this.tick(), 1000);
  }

  handleStateChange(event) {
    // On new video loaded
    if (event.data === -1) {
      this.props.handleReady();
    }
    this.props.handleChange(event.target.getDuration());
  }

  handleEnd() {
    // @Todo: Probs want tune to stay in queue (but at final duration) if last
    // if last tune in queue.
    this.props.handleNext();
  }

  tick() {
    if (this.props.playing) {
      this.props.handleProgressChange(
        this.state.player.getCurrentTime(),
        false,
      );
    }
  }

  render() {
    const options = {
      playerVars: {
        autoplay: this.props.playing ? 1 : 0,
      },
    };

    return (
      <div style={{ display: 'block' }}>
        <YouTube
          videoId={this.props.tune.id}
          opts={options}
          onReady={this.handleReady}
          onEnd={this.handleEnd}
          onStateChange={this.handleStateChange}
        />
      </div>
    );
  }
}

PlayerAudio.propTypes = {
  tune: PropTypes.shape().isRequired,
  progress: PropTypes.shape({
    timePassed: PropTypes.number.isRequired,
    seek: PropTypes.bool.isRequired,
  }).isRequired,
  playing: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleReady: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleProgressChange: PropTypes.func.isRequired,
};

export default PlayerAudio;
