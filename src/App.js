import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import Results from './Results';
import Anime from './Anime';
import Player from './Player';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      results: [],
      queue: [],
      playing: false,
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleAddTune = this.handleAddTune.bind(this);
    this.handleRemoveTune = this.handleRemoveTune.bind(this);
    this.handlePlayTune = this.handlePlayTune.bind(this);
    this.handlePauseTune = this.handlePauseTune.bind(this);
    this.handleSkipToTune = this.handleSkipToTune.bind(this);
    this.handleNextTune = this.handleNextTune.bind(this);
  }

  handleSearchSubmit(state) {
    this.setState(state);
  }

  handleAddTune(tune, play) {
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

  handleRemoveTune(id) {
    this.setState(
      {
        queue: this.state.queue.filter(tune => tune.id !== id),
      },
      this.handleIfEndReached,
    );
  }

  handlePlayTune() {
    this.setState({
      playing: true,
    });
  }

  handlePauseTune() {
    this.setState({
      playing: false,
    });
  }

  handleSkipToTune(id) {
    const index = this.state.queue.findIndex(tune => tune.id === id);

    this.setState({
      queue: this.state.queue.filter((tune, i) => i >= index),
      playing: true,
    });
  }

  handleNextTune() {
    this.setState(
      {
        queue: this.state.queue.slice(1),
      },
      this.handleIfEndReached,
    );
  }

  handleIfEndReached() {
    if (!this.state.queue.length) {
      this.setState({
        playing: false,
      });
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Search handleSearchSubmit={this.handleSearchSubmit} />
          <Route
            path="/results"
            render={props => (
              <Results
                {...props}
                error={this.state.error}
                loading={this.state.loading}
                results={this.state.results}
              />
            )}
          />
          <Route
            path="/anime/:mal_id"
            render={props => (
              <Anime {...props} handleAddTune={this.handleAddTune} />
            )}
          />
          {this.state.queue.length > 0 && (
            <Player
              queue={this.state.queue}
              playing={this.state.playing}
              handleRemove={this.handleRemoveTune}
              handlePlay={this.handlePlayTune}
              handlePause={this.handlePauseTune}
              handleSkipTo={this.handleSkipToTune}
              handleNext={this.handleNextTune}
            />
          )}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
