import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QueueItemControls extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  handleClickPlay() {
    // this.props.handlePlay();
  }

  handleClickRemove() {
    this.props.handleRemove(this.props.id);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClickPlay}>Play</button>
        <button onClick={this.handleClickRemove}>Remove</button>
      </div>
    );
  }
}

QueueItemControls.propTypes = {
  id: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default QueueItemControls;
