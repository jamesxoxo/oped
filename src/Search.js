import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit(value) {
    if (!value.trim()) return;

    this.props.handleSearchSubmit({
      loading: true,
    });

    fetch(`https://api.jikan.moe/search/anime/${value}/1`)
      .then(res => res.json())
      .then(
        result => {
          let state = {
            loading: false,
            results: result.result,
          };

          if ('error' in result) {
            state = {
              loading: false,
              error: {
                message: result.error,
              },
            };
          }

          this.props.handleSearchSubmit(state);
        },
        error => {
          this.props.handleSearchSubmit({
            loading: false,
            error,
          });
        },
      );
  }

  render() {
    return <SearchForm handleSearchSubmit={this.handleSearchSubmit} />;
  }
}

Search.propTypes = {
  handleSearchSubmit: PropTypes.func.isRequired,
};

export default Search;
