import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerAudio from './PlayerAudio';
import Queue from './Queue';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <PlayerAudio tune={this.props.queue[0]} />
        <Queue queue={this.props.queue} />
      </div>
    );
  }
}

Player.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Player;
