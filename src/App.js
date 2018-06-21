import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import veryUniqueId from './util/veryUniqueId';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Results from './Results';
import Anime from './Anime';
import Player from './Player';

const theme = {
  grey: '#d2d2d2',
  black: '#212529',
  primary: '#e48d9c',
  inputPaddingY: '.375rem',
  inputPaddingX: '.75rem',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100%;
  padding-bottom: ${props => (props.controlsOpen ? '71px' : '0')};
  transition: padding-bottom 0.35s ease;
`;

const Main = styled.section`
  flex-grow: 1;
  padding: 1rem;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      results: [],
      queue: [],
      history: [],
      playing: false,
      loaded: false,
      inputFocused: false,
    };

    this.hydrateState = this.hydrateState.bind(this);
    this.updateState = this.updateState.bind(this);
    this.saveState = this.saveState.bind(this);
    this.addTune = this.addTune.bind(this);
    this.removeTune = this.removeTune.bind(this);
    this.playTune = this.playTune.bind(this);
    this.pauseTune = this.pauseTune.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.skipToTune = this.skipToTune.bind(this);
    this.previousTune = this.previousTune.bind(this);
    this.nextTune = this.nextTune.bind(this);
  }

  componentDidMount() {
    this.hydrateState();
    window.addEventListener('beforeunload', this.saveState);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveState);
    this.saveState();
  }

  hydrateState() {
    const queue = JSON.parse(localStorage.getItem('queue')) || [];
    const history = JSON.parse(localStorage.getItem('history')) || [];

    this.setState({
      queue,
      history,
    });
  }

  updateState(state) {
    this.setState(state);
  }

  saveState() {
    localStorage.setItem('queue', JSON.stringify(this.state.queue));
    localStorage.setItem(
      'history',
      JSON.stringify(this.state.history.slice(0, 20)),
    );
  }

  addTune(tune, play) {
    const queueIds = this.state.queue.map(queueTune => queueTune.id);
    const historyIds = this.state.history.map(historyTune => historyTune.id);
    const id = veryUniqueId([...queueIds, ...historyIds], 'queue');

    if (play) {
      if (this.state.playing) {
        this.setState({
          queue: [{ ...tune, id }, ...this.state.queue.slice(1)],
          playing: true,
          history: [this.state.queue[0], ...this.state.history],
        });
      } else {
        this.setState({
          queue: [{ ...tune, id }, ...this.state.queue],
          playing: true,
        });
      }
    } else {
      this.setState({
        queue: [...this.state.queue, { ...tune, id }],
      });
    }
  }

  removeTune(id) {
    this.setState({
      queue: this.state.queue.filter(tune => tune.id !== id),
      playing: this.state.queue.length === 1 ? false : this.state.playing,
    });
  }

  playTune() {
    this.setState({
      playing: true,
    });
  }

  pauseTune() {
    this.setState({
      playing: false,
    });
  }

  togglePlay() {
    if (this.state.playing) {
      this.pauseTune();
    } else {
      this.playTune();
    }
  }

  skipToTune(id) {
    const index = this.state.queue.findIndex(tune => tune.id === id);

    this.setState({
      queue: this.state.queue.filter((tune, i) => i >= index),
      playing: true,
      history: [this.state.queue[0], ...this.state.history],
    });
  }

  previousTune() {
    this.setState({
      queue: [this.state.history[0], ...this.state.queue],
      history: this.state.history.slice(1),
    });
  }

  // @Todo: If no tune in queue then pick a tune further down the page
  nextTune() {
    this.setState({
      queue: this.state.queue.slice(1),
      playing: this.state.queue.length === 1 ? false : this.state.playing,
      history: [this.state.queue[0], ...this.state.history],
    });
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Container className="App" controlsOpen={this.state.queue.length > 0}>
            <Header updateState={this.updateState} />
            <Main>
              <Route exact path="/" component={Home} />
              <Route
                path="/results"
                render={props => (
                  <Results
                    {...props}
                    error={this.state.error}
                    results={this.state.results}
                  />
                )}
              />
              <Route
                path="/anime/:mal_id"
                render={props => (
                  <Anime
                    {...props}
                    queue={this.state.queue}
                    loaded={this.state.loaded}
                    playing={this.state.playing}
                    togglePlay={this.togglePlay}
                    addTune={this.addTune}
                  />
                )}
              />
              <Player
                queue={this.state.queue}
                history={this.state.history}
                playing={this.state.playing}
                loaded={this.state.loaded}
                inputFocused={this.state.inputFocused}
                updateAppState={this.updateState}
                removeTune={this.removeTune}
                playTune={this.playTune}
                pauseTune={this.pauseTune}
                togglePlay={this.togglePlay}
                skipToTune={this.skipToTune}
                previousTune={this.previousTune}
                nextTune={this.nextTune}
              />
            </Main>
            <Footer />
          </Container>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
