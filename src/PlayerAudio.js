import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

class PlayerAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <YouTube videoId={this.props.tune.id} />;
  }
}

PlayerAudio.propTypes = {
  tune: PropTypes.shape().isRequired,
};

export default PlayerAudio;
