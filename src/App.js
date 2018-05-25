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
      // queue: [],
      queue: [
        {
          anime: 'Bakemonogatari',
          id: 'vMMu7wfBNEA',
          image: 'https://myanimelist.cdn-dena.com/images/anime/11/75274.jpg',
          title: '"Sugar Sweet Nightmare" by Yui Horie',
        },
        {
          anime: 'Himouto! Umaru-chan R',
          id: 'kIBPIyxWGwg',
          image: 'https://myanimelist.cdn-dena.com/images/anime/10/89671.jpg',
          title:
            '"Nimensei☆Ura Omote Life! (にめんせい☆ウラオモテライフ！)" by Umaru Doma (Aimi Tanaka)',
        },
      ],
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

  handleIfEndReached() {
    if (!this.state.queue.length) {
      this.setState({
        playing: false,
      });
    }
  }

  handleSearchSubmit(state) {
    this.setState(state);
  }

  handleAddTune(tune) {
    this.setState({
      queue: [...this.state.queue, tune],
    });
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
          <Player
            queue={this.state.queue}
            playing={this.state.playing}
            handleRemove={this.handleRemoveTune}
            handlePlay={this.handlePlayTune}
            handlePause={this.handlePauseTune}
            handleSkipTo={this.handleSkipToTune}
            handleNext={this.handleNextTune}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
