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
    return (
      <div>
        <PlayerAudio tune={this.props.queue[0]} playing={this.state.playing} />
        <PlayerControls
          handlePlay={this.handlePlay}
          handlePause={this.handlePause}
        />
        <QueueItem tune={this.props.queue[0]} />
        <Queue queue={this.props.queue} />
      </div>
    );
  }
}

Player.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Player;
