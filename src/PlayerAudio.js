import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

class PlayerAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
    };

    this.handleReady = this.handleReady.bind(this);
  }

  componentDidUpdate() {
    if (this.props.playing) {
      this.state.player.playVideo();
    } else {
      this.state.player.pauseVideo();
    }
  }

  handleReady(event) {
    this.setState({
      player: event.target,
    });
  }

  render() {
    return (
      <div style={{ display: 'block' }}>
        <YouTube videoId={this.props.tune.id} onReady={this.handleReady} />
      </div>
    );
  }
}

PlayerAudio.propTypes = {
  tune: PropTypes.shape().isRequired,
  playing: PropTypes.bool.isRequired,
};

export default PlayerAudio;
