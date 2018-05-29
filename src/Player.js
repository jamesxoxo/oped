import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerAudio from './PlayerAudio';
import PlayerControls from './PlayerControls';
import PlayerTimeline from './PlayerTimeline';
import PlayerVolume from './PlayerVolume';
import Queue from './Queue';
import QueueItem from './QueueItem';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: {
        timePassed: 0,
        seek: false,
      },
      duration: null,
      volume: 100,
      prevVolume: null,
    };

    this.handleAudioReady = this.handleAudioReady.bind(this);
    this.handleAudioChange = this.handleAudioChange.bind(this);
    this.handleProgressChange = this.handleProgressChange.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
  }

  handleAudioReady() {
    this.setState({
      progress: {
        timePassed: 0,
        seek: false,
      },
    });
  }

  handleAudioChange(duration) {
    this.setState({
      duration,
    });
  }

  handleProgressChange(timePassed, seek) {
    this.setState({
      progress: {
        timePassed,
        seek,
      },
    });
  }

  handleVolumeChange(volume) {
    this.setState({
      prevVolume: this.state.volume,
    });
    this.setState({
      volume,
    });
  }

  render() {
    const tune = this.props.queue[0];

    return (
      <div>
        {tune && (
          <PlayerAudio
            tune={tune}
            progress={this.state.progress}
            volume={this.state.volume}
            playing={this.props.playing}
            handlePause={this.props.handlePause}
            handleNext={this.props.handleNext}
            handleReady={this.handleAudioReady}
            handleChange={this.handleAudioChange}
            handleProgressChange={this.handleProgressChange}
          />
        )}
        <PlayerControls
          handlePlay={this.props.handlePlay}
          handlePause={this.props.handlePause}
          handleNext={this.props.handleNext}
        />
        <PlayerTimeline
          progress={this.state.progress}
          duration={this.state.duration}
          handleProgressChange={this.handleProgressChange}
        />
        <PlayerVolume
          volume={this.state.volume}
          prevVolume={this.state.prevVolume}
          handleVolumeChange={this.handleVolumeChange}
        />
        <QueueItem tune={tune} />
        <Queue
          queue={this.props.queue}
          handleRemove={this.props.handleRemove}
          handleSkipTo={this.props.handleSkipTo}
        />
      </div>
    );
  }
}

Player.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  playing: PropTypes.bool.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handlePlay: PropTypes.func.isRequired,
  handlePause: PropTypes.func.isRequired,
  handleSkipTo: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default Player;
