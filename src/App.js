import React from 'react';
import Header from './Header';
import Search from './Search';
import Results from './Results';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      items: []
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit(value) {
    this.setState({
      loading: true
    });
    fetch(`https://api.jikan.moe/search/anime/${value}/1`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            loading: false,
            items: result.result
          });
        },
        error => {
          this.setState({
            loading: false,
            error
          });
        }
      );
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Search onsearchSubmit={this.handleSearchSubmit} />
        <Results
          error={this.state.error}
          loading={this.state.loading}
          items={this.state.items}
        />
      </div>
    );
  }
}

export default App;
