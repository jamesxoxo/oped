import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Search from './Search';
import Results from './Results';
import Anime from './Anime';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      items: [],
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit(state) {
    this.setState(state);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Search onSearchSubmit={this.handleSearchSubmit} />
          <Route
            path="/results/:search"
            render={props => (
              <Results
                {...props}
                error={this.state.error}
                loading={this.state.loading}
                items={this.state.items}
              />
            )}
          />
          <Route path="/anime/:mal_id" component={Anime} />
        </div>
      </Router>
    );
  }
}

export default App;
