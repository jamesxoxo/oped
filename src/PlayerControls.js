import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerButtons from './PlayerButtons';

class PlayerControls extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <PlayerButtons
          handlePlay={this.props.handlePlay}
          handlePause={this.props.handlePause}
        />
      </div>
    );
  }
}

PlayerControls.propTypes = {
  handlePlay: PropTypes.func.isRequired,
  handlePause: PropTypes.func.isRequired,
};

export default PlayerControls;
