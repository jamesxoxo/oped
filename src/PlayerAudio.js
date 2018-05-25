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
    this.handleEnd = this.handleEnd.bind(this);
  }

  componentDidUpdate() {
    // Todo: Check against prevProps
    console.log(this.props.playing);
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

  handleEnd() {
    this.props.handleNext();
  }

  render() {
    const options = {
      playerVars: {
        autoplay: this.props.playing ? 1 : 0,
      },
    };

    return (
      <div style={{ display: 'block' }}>
        <YouTube
          videoId={this.props.tune.id}
          opts={options}
          onReady={this.handleReady}
          onEnd={this.handleEnd}
        />
      </div>
    );
  }
}

PlayerAudio.propTypes = {
  tune: PropTypes.shape().isRequired,
  playing: PropTypes.bool.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default PlayerAudio;
