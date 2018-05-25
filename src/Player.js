import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerAudio from './PlayerAudio';
import PlayerControls from './PlayerControls';
import Queue from './Queue';
import QueueItem from './QueueItem';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  handlePlay() {
    this.setState({
      playing: true,
    });
  }

  handlePause() {
    this.setState({
      playing: false,
    });
  }

  render() {
    const tune = this.props.queue[0];

    return (
      <div>
        {tune && (
          <PlayerAudio
            tune={tune}
            playing={this.state.playing}
            handlePause={this.handlePause}
          />
        )}
        <PlayerControls
          handlePlay={this.handlePlay}
          handlePause={this.handlePause}
          handleNext={this.props.handleNext}
        />
        <QueueItem tune={tune} />
        <Queue queue={this.props.queue} />
      </div>
    );
  }
}

Player.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default Player;
