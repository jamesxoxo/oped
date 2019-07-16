import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faList from '@fortawesome/fontawesome-free-solid/faList';
import Button from './theme/Button';

class QueueButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { buttonClick } = this.props;

    buttonClick();
  }

  render() {
    const { open } = this.props;

    return (
      <Button
        onClick={this.handleClick}
        aria-label={open ? 'Close queue' : 'Open queue'}
      >
        <FontAwesomeIcon icon={faList} />
      </Button>
    );
  }
}
QueueButton.propTypes = {
  open: PropTypes.bool.isRequired,
  buttonClick: PropTypes.func.isRequired,
};

export default QueueButton;
