import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';

class Search extends Component {
  constructor(props) {
    super(props);

    this.searchSubmit = this.searchSubmit.bind(this);
  }

  searchSubmit(value) {
    if (!value.trim()) return;

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

          this.props.searchSubmit(state);
        },
        error => {
          this.props.searchSubmit({
            error,
          });
        },
      );
  }

  render() {
    return <SearchForm searchSubmit={this.searchSubmit} />;
  }
}

Search.propTypes = {
  searchSubmit: PropTypes.func.isRequired,
};

export default Search;
