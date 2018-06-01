import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import Hidden from './theme/Hidden';

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

    this.props.audioReady();
    this.timer = setInterval(() => this.tick(), 1000);
  }

  handleStateChange(event) {
    // On new video loaded
    if (event.data === -1) {
      this.props.audioReady();
    }

    console.log(event.data);

    // @Todo: Check this jumping back to 00:00
    this.props.audioChange(event.target.getDuration());
  }

  handleEnd() {
    this.props.nextTune();
  }

  tick() {
    if (this.props.playing) {
      this.props.progressChange(this.state.player.getCurrentTime(), false);
    }
  }

  render() {
    const options = {
      playerVars: {
        autoplay: this.props.playing ? 1 : 0,
      },
    };

    return (
      <Hidden>
        <YouTube
          videoId={this.props.tune.id}
          opts={options}
          onReady={this.handleReady}
          onEnd={this.handleEnd}
          onStateChange={this.handleStateChange}
        />
      </Hidden>
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
  nextTune: PropTypes.func.isRequired,
  audioReady: PropTypes.func.isRequired,
  audioChange: PropTypes.func.isRequired,
  progressChange: PropTypes.func.isRequired,
};

export default PlayerAudio;
