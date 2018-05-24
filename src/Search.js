import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit(value) {
    this.props.onSearchSubmit({
      loading: true,
    });

    fetch(`https://api.jikan.moe/search/anime/${value}/1`)
      .then(res => res.json())
      .then(
        result => {
          let state;

          if ('error' in result) {
            state = {
              loading: false,
              error: {
                message: result.error,
              },
            };
          }

          state = {
            loading: false,
            items: result.result,
          };

          this.props.onSearchSubmit(state);
        },
        error => {
          this.props.onSearchSubmit({
            loading: false,
            error,
          });
        },
      );
  }

  render() {
    return <SearchInput onSearchSubmit={this.handleSearchSubmit} />;
  }
}

Search.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};

export default Search;
