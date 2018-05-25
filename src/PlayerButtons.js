import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlayerButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClickPause = this.handleClickPause.bind(this);
  }

  handleClickPlay() {
    this.props.handlePlay();
  }

  handleClickPause() {
    this.props.handlePause();
  }

  render() {
    return (
      <div>
        <button>Previous</button>
        <button onClick={this.handleClickPlay}>Play</button>
        <button onClick={this.handleClickPause}>Pause</button>
        <button>Next</button>
      </div>
    );
  }
}

PlayerButtons.propTypes = {
  handlePlay: PropTypes.func.isRequired,
  handlePause: PropTypes.func.isRequired,
};

export default PlayerButtons;
