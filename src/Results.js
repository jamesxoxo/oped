import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ResultsList from './ResultsList';

function Results({ error, loading, results }) {
  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else if (results.length) {
    return <ResultsList results={results} />;
  }

  return <Redirect to="/" />;
}

Results.propTypes = {
  error: PropTypes.shape(),
  loading: PropTypes.bool.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};
Results.defaultProps = {
  error: null,
};

export default Results;
