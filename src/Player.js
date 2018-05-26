import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerAudio from './PlayerAudio';
import PlayerControls from './PlayerControls';
import PlayerVolume from './PlayerVolume';
import Queue from './Queue';
import QueueItem from './QueueItem';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 100,
      prevVolume: null,
    };

    this.handleVolumeChange = this.handleVolumeChange.bind(this);
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
            playing={this.props.playing}
            handlePause={this.props.handlePause}
            handleNext={this.props.handleNext}
          />
        )}
        <PlayerControls
          handlePlay={this.props.handlePlay}
          handlePause={this.props.handlePause}
          handleNext={this.props.handleNext}
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
