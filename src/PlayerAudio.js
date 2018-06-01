import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import Hidden from './theme/Hidden';

class PlayerAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
    };

    this.handleReady = this.handleReady.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  componentDidUpdate() {
    // @Todo: Maybe want to check against some prevProps in here
    const { audio } = this.state;

    if (!audio) return;

    if (this.props.playing) {
      audio.playVideo();
    } else {
      audio.pauseVideo();
    }

    if (this.props.progress.seek) {
      audio.seekTo(this.props.progress.timePassed);
    }

    audio.setVolume(this.props.volume);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleReady(event) {
    const audio = event.target;

    this.setState({
      audio,
    });

    this.timer = setInterval(() => this.tick(), 100);
  }

  handleStateChange(event) {
    const audio = event.target;
    const duration = audio.getDuration();

    if (event.data === -1) {
      this.props.setProgress(0);

      if (duration) {
        this.props.setDuration(audio.getDuration());
      }
    }
  }

  handleEnd() {
    this.props.nextTune();
  }

  tick() {
    if (this.props.playing) {
      this.props.setProgress(this.state.audio.getCurrentTime(), false);
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
  setDuration: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default PlayerAudio;
