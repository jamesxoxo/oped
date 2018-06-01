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

    this.handleSkipClick = this.handleSkipClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleSkipClick() {
    this.props.skipToTune(this.props.id);
  }

  handleRemoveClick() {
    this.props.removeTune(this.props.id);
  }

  render() {
    return (
      <div>
        <Button aria-label="Play" onClick={this.handleSkipClick}>
          <FontAwesomeIcon icon={faPlay} />
        </Button>
        <Button aria-label="Remove" onClick={this.handleRemoveClick}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    );
  }
}

QueueItemControls.propTypes = {
  id: PropTypes.string.isRequired,
  removeTune: PropTypes.func.isRequired,
  skipToTune: PropTypes.func.isRequired,
};

export default QueueItemControls;
