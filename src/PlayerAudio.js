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
    this.handlePlay = this.handlePlay.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  componentDidUpdate() {
    const { loaded, playing, progress, volume } = this.props;
    const { audio } = this.state;

    if (!audio || !loaded) return;

    if (playing) {
      audio.playVideo();
    } else {
      audio.pauseVideo();
    }

    if (progress.seek) {
      audio.seekTo(progress.timePassed);
    }

    audio.setVolume(volume);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleReady(event) {
    const audio = event.target;

    this.setState({
      audio,
    });

    // @Todo: Test this
    audio.mute();
    this.timer = setInterval(() => this.tick(), 100);
  }

  handlePlay() {
    const { loaded, setProgress, updateAppState } = this.props;
    const { audio } = this.state;

    if (!loaded) {
      audio.pauseVideo();
      setProgress(0, true);
      audio.unMute();
      updateAppState({
        loaded: true,
      });
    }
  }

  handleEnd() {
    const { nextTune } = this.props;

    nextTune();
  }

  handleStateChange(event) {
    const { updateAppState, updateState } = this.props;
    const duration = event.target.getDuration();

    if (event.data === -1 || event.data === 5) {
      updateAppState({
        loaded: false,
      });
    }

    if (duration) {
      updateState({
        duration,
      });
    }
  }

  tick() {
    const { playing, setProgress } = this.props;
    const { audio } = this.state;

    if (playing) {
      setProgress(audio.getCurrentTime(), false);
    }
  }

  render() {
    const { tune } = this.props;
    const options = {
      playerVars: {
        autoplay: 1,
      },
    };

    return (
      <Hidden>
        <YouTube
          videoId={tune.youtubeId}
          opts={options}
          onReady={this.handleReady}
          onPlay={this.handlePlay}
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
  loaded: PropTypes.bool.isRequired,
  nextTune: PropTypes.func.isRequired,
  updateAppState: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default PlayerAudio;
