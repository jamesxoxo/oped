import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';

class Search extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
  }

  search(value) {
    fetch(`https://api.jikan.moe/search/anime/${value}/1`)
      .then(res => res.json())
      .then(
        result => {
          let state = {
            results: result.result,
          };

          if ('error' in result) {
            state = {
              error: {
                message: result.error,
              },
            };
          }

          this.props.updateState(state);
        },
        error => {
          this.props.updateState({
            error,
          });
        },
      );
  }

  render() {
    return <SearchForm search={this.search} />;
  }
}

Search.propTypes = {
  updateState: PropTypes.func.isRequired,
};

export default Search;
