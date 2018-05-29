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
      history: [],
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleAddTune = this.handleAddTune.bind(this);
    this.handleRemoveTune = this.handleRemoveTune.bind(this);
    this.handlePlayTune = this.handlePlayTune.bind(this);
    this.handlePauseTune = this.handlePauseTune.bind(this);
    this.handleSkipToTune = this.handleSkipToTune.bind(this);
    this.handlePreviousTune = this.handlePreviousTune.bind(this);
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
    this.setState({
      queue: this.state.queue.filter(tune => tune.id !== id),
      playing: this.state.queue.length === 1 ? false : this.state.playing,
    });
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
      history: [this.state.queue[0], ...this.state.history],
    });
  }

  handlePreviousTune() {
    this.setState({
      queue: [this.state.history[0], ...this.state.queue],
      history: this.state.history.slice(1),
    });
  }

  handleNextTune() {
    this.setState({
      queue: this.state.queue.slice(1),
      playing: this.state.queue.length === 1 ? false : this.state.playing,
      history: [this.state.queue[0], ...this.state.history],
    });
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
              history={this.state.history}
              handleRemove={this.handleRemoveTune}
              handlePlay={this.handlePlayTune}
              handlePause={this.handlePauseTune}
              handleSkipTo={this.handleSkipToTune}
              handlePrevious={this.handlePreviousTune}
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
