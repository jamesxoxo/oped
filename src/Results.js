import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ResultsList from './ResultsList';

function Results({ error, results, location }) {
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (results.length) {
    return <ResultsList results={results} />;
  } else if (!location.search) {
    return <Redirect to="/" />;
  }

  return <div>Loading...</div>;
}

Results.propTypes = {
  error: PropTypes.shape(),
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape().isRequired,
};
Results.defaultProps = {
  error: null,
};

export default Results;
