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
    const { queue, history } = this.state;

    localStorage.setItem('queue', JSON.stringify(queue));
    localStorage.setItem('history', JSON.stringify(history.slice(0, 20)));
  }

  addTune(tune, play) {
    const { queue, history, playing } = this.state;
    const queueIds = queue.map(queueTune => queueTune.id);
    const historyIds = history.map(historyTune => historyTune.id);
    const id = veryUniqueId([...queueIds, ...historyIds], 'queue');

    if (play) {
      if (playing) {
        this.setState({
          queue: [{ ...tune, id }, ...queue.slice(1)],
          playing: true,
          history: [queue[0], ...history],
        });
      } else {
        this.setState({
          queue: [{ ...tune, id }, ...queue],
          playing: true,
        });
      }
    } else {
      this.setState({
        queue: [...queue, { ...tune, id }],
      });
    }
  }

  removeTune(id) {
    const { queue, playing } = this.state;

    this.setState({
      queue: queue.filter(tune => tune.id !== id),
      playing: queue.length === 1 ? false : playing,
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
    const { playing } = this.state;

    if (playing) {
      this.pauseTune();
    } else {
      this.playTune();
    }
  }

  skipToTune(id) {
    const { queue, history } = this.state;
    const index = queue.findIndex(tune => tune.id === id);

    this.setState({
      queue: queue.filter((tune, i) => i >= index),
      playing: true,
      history: [queue[0], ...history],
    });
  }

  previousTune() {
    const { queue, history } = this.state;

    this.setState({
      queue: [history[0], ...queue],
      history: history.slice(1),
    });
  }

  // @Todo: If no tune in queue then pick a tune further down the page
  nextTune() {
    const { queue, history, playing } = this.state;

    this.setState({
      queue: queue.slice(1),
      playing: queue.length === 1 ? false : playing,
      history: [queue[0], ...history],
    });
  }

  render() {
    const {
      queue,
      error,
      results,
      loaded,
      playing,
      history,
      inputFocused,
    } = this.state;

    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Container className="App" controlsOpen={queue.length > 0}>
            <Header updateState={this.updateState} />
            <Main>
              <Route exact path="/" component={Home} />
              <Route
                path="/results"
                render={props => (
                  <Results {...props} error={error} results={results} />
                )}
              />
              <Route
                path="/anime/:mal_id"
                render={props => (
                  <Anime
                    {...props}
                    queue={queue}
                    loaded={loaded}
                    playing={playing}
                    togglePlay={this.togglePlay}
                    addTune={this.addTune}
                  />
                )}
              />
              <Player
                queue={queue}
                history={history}
                playing={playing}
                loaded={loaded}
                inputFocused={inputFocused}
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
