import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QueueItemControls extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleClickSkip = this.handleClickSkip.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  handleClickSkip() {
    this.props.handleSkipTo(this.props.id);
  }

  handleClickRemove() {
    this.props.handleRemove(this.props.id);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClickSkip}>Skip</button>
        <button onClick={this.handleClickRemove}>Remove</button>
      </div>
    );
  }
}

QueueItemControls.propTypes = {
  id: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleSkipTo: PropTypes.func.isRequired,
};

export default QueueItemControls;
