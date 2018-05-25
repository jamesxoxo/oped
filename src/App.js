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
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleAddTune = this.handleAddTune.bind(this);
  }

  handleSearchSubmit(state) {
    this.setState(state);
  }

  handleAddTune(tune) {
    this.setState({
      queue: [tune, ...this.state.queue],
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
          <Player queue={this.state.queue} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
