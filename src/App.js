import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
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
      playing: false,
      history: [],
      inputFocused: false,
    };

    this.updateState = this.updateState.bind(this);
    this.addTune = this.addTune.bind(this);
    this.removeTune = this.removeTune.bind(this);
    this.playTune = this.playTune.bind(this);
    this.pauseTune = this.pauseTune.bind(this);
    this.skipToTune = this.skipToTune.bind(this);
    this.previousTune = this.previousTune.bind(this);
    this.nextTune = this.nextTune.bind(this);
  }

  updateState(state) {
    this.setState(state);
  }

  addTune(tune, play) {
    if (play) {
      this.setState({
        queue: [tune, ...this.state.queue],
        playing: true,
      });
    } else {
      this.setState({
        queue: [...this.state.queue, tune],
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
                render={props => <Anime {...props} addTune={this.addTune} />}
              />
              {this.state.queue.length > 0 && (
                <Player
                  queue={this.state.queue}
                  playing={this.state.playing}
                  history={this.state.history}
                  inputFocused={this.state.inputFocused}
                  removeTune={this.removeTune}
                  playTune={this.playTune}
                  pauseTune={this.pauseTune}
                  skipToTune={this.skipToTune}
                  previousTune={this.previousTune}
                  nextTune={this.nextTune}
                />
              )}
            </Main>
            <Footer />
          </Container>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
