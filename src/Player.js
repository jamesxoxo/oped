import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Queue from './Queue';

class Player extends Component {
  render() {
    return (
      <div>
        <div>Player</div>
        <Queue queue={this.props.queue} />
      </div>
    );
  }
}

Player.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Player;
