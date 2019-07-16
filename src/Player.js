import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlayerAudio from './PlayerAudio';
import PlayerButtons from './PlayerButtons';
import PlayerTimeline from './PlayerTimeline';
import PlayerVolume from './PlayerVolume';
import Queue from './Queue';
import QueueItem from './QueueItem';

const PlayerControls = styled.div`
  position: fixed;
  right: 0;
  bottom: ${props => (props.show ? '0' : '-71px')};
  left: 0;
  display: flex;
  align-items: center;
  height: 71px;
  padding: 1rem;
  background-color: #fff;
  border-top: 1px solid ${props => props.theme.primary};
  transition: bottom 0.34s ease;
`;

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: {
        timePassed: 0,
        seek: false,
      },
      duration: null,
      volume: 100,
      prevVolume: null,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updateState = this.updateState.bind(this);
    this.setProgress = this.setProgress.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.rewind = this.rewind.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  setProgress(timePassed = 0, seek) {
    this.setState({
      progress: {
        timePassed,
        seek,
      },
    });
  }

  setVolume(volume) {
    const { volume: prevVolume } = this.state;

    this.setState({
      prevVolume,
    });
    this.setState({
      volume,
    });
  }

  updateState(state) {
    this.setState(state);
  }

  toggleMute() {
    const { volume, prevVolume } = this.state;

    if (volume > 0) {
      this.setVolume(0);
    } else {
      this.setVolume(prevVolume);
    }
  }

  handleKeyDown(event) {
    const { inputFocused, togglePlay } = this.props;

    if (inputFocused) return;

    if (event.code === 'Space' || event.code === 'KeyK') {
      togglePlay();
      event.preventDefault();
    } else if (event.code === 'KeyM') {
      this.toggleMute();
      event.preventDefault();
    }
  }

  rewind() {
    const { history, previousTune } = this.props;
    const { progress } = this.state;

    if (progress.timePassed > 5 || !history.length) {
      this.setState({
        progress: {
          timePassed: 0,
          seek: true,
        },
      });
    } else {
      previousTune();
    }
  }

  render() {
    const {
      queue,
      loaded,
      playing,
      nextTune,
      updateAppState,
      togglePlay,
      playTune,
      pauseTune,
      removeTune,
      skipToTune,
    } = this.props;
    const { progress, volume, duration, prevVolume } = this.state;
    const tune = queue[0];

    return (
      <PlayerControls show={!!tune}>
        {tune && (
          <Fragment>
            <PlayerAudio
              tune={tune}
              progress={progress}
              volume={volume}
              loaded={loaded}
              playing={playing}
              nextTune={nextTune}
              updateAppState={updateAppState}
              audioReady={this.audioReady}
              updateState={this.updateState}
              setProgress={this.setProgress}
            />
            <PlayerButtons
              loaded={loaded}
              playing={playing}
              progress={progress}
              audioReady={this.audioReady}
              previousTune={this.rewind}
              togglePlay={togglePlay}
              nextTune={nextTune}
            />
            <PlayerTimeline
              progress={progress}
              duration={duration}
              loaded={loaded}
              playing={playing}
              setProgress={this.setProgress}
              playTune={playTune}
              pauseTune={pauseTune}
            />
            <PlayerVolume
              volume={volume}
              prevVolume={prevVolume}
              setVolume={this.setVolume}
              toggleMute={this.toggleMute}
            />
            <QueueItem tune={tune} />
            <Queue
              loaded={loaded}
              queue={queue}
              playing={playing}
              togglePlay={togglePlay}
              removeTune={removeTune}
              skipToTune={skipToTune}
            />
          </Fragment>
        )}
      </PlayerControls>
    );
  }
}
Player.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  playing: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  updateAppState: PropTypes.func.isRequired,
  inputFocused: PropTypes.bool.isRequired,
  removeTune: PropTypes.func.isRequired,
  playTune: PropTypes.func.isRequired,
  pauseTune: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  skipToTune: PropTypes.func.isRequired,
  previousTune: PropTypes.func.isRequired,
  nextTune: PropTypes.func.isRequired,
};

export default Player;
