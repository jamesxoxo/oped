import React from 'react';
import PropTypes from 'prop-types';
import ResultsList from './ResultsList';

function Results({ error, loading, items }) {
  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <ResultsList items={items} />;
}

Results.propTypes = {
  error: PropTypes.shape(),
  loading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Results.defaultProps = {
  error: null,
};

export default Results;
