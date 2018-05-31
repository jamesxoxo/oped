import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import Button from './theme/Button';

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
        <Button aria-label="Play" onClick={this.handleClickSkip}>
          <FontAwesomeIcon icon={faPlay} />
        </Button>
        <Button aria-label="Remove" onClick={this.handleClickRemove}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
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
