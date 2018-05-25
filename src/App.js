import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import Results from './Results';
import Anime from './Anime';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      results: [],
      queue: [],
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleAddTune = this.handleAddTune.bind(this);
  }

  handleSearchSubmit(state) {
    this.setState(state);
  }

  handleAddTune(tune) {
    this.setState({
      queue: [...this.state.queue, tune],
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
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
