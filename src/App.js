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

  handleSearchSubmit(value) {
    this.setState({
      loading: true,
    });
    fetch(`https://api.jikan.moe/search/anime/${value}/1`)
      .then(res => res.json())
      .then(
        result => {
          if ('error' in result) {
            this.setState({
              loading: false,
              error: {
                message: result.error,
              },
            });
          } else {
            this.setState({
              loading: false,
              items: result.result,
            });
          }
        },
        error => {
          this.setState({
            loading: false,
            error,
          });
        },
      );
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Search onsearchSubmit={this.handleSearchSubmit} />
          <Route
            exact
            path="/"
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
