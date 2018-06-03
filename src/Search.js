import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';

class Search extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
  }

  search(value) {
    const query = value.trim();

    if (!query) return;

    if (query.length < 3) {
      this.props.updateState({
        error: {
          message: 'Search must be more than three characters.',
        },
      });

      return;
    }

    this.props.updateState({ results: [] });
    fetch(`https://api.jikan.moe/search/anime/${query}/1`)
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
    this.props.history.push(`/results?search=${query}`);
  }

  render() {
    return <SearchForm search={this.search} />;
  }
}

Search.propTypes = {
  history: PropTypes.shape().isRequired,
  updateState: PropTypes.func.isRequired,
};

export default withRouter(Search);
