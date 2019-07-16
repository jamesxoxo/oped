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
    const { updateState, history } = this.props;
    const query = value.trim();

    if (!query) return;

    if (query.length < 3) {
      updateState({
        error: {
          message: 'Search must be more than three characters.',
        },
      });

      return;
    }

    updateState({ results: [] });
    fetch(`https://api.jikan.moe/search/anime/${query}/1`)
      .then(res => res.json())
      .then(
        result => {
          let state = {
            results: result.result,
          };

          if ('error' in result) {
            state = {
              ...result,
            };
          }

          updateState(state);
        },
        error => {
          updateState({
            error,
          });
        },
      );
    history.push(`/results?search=${query}`);
  }

  render() {
    const { updateState } = this.props;

    return <SearchForm search={this.search} updateState={updateState} />;
  }
}
Search.propTypes = {
  history: PropTypes.shape().isRequired,
  updateState: PropTypes.func.isRequired,
};

export default withRouter(Search);
