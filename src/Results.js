import React from 'react';
import PropTypes from 'prop-types';
import List from './List';

function Results(props) {
  const { error, loading, items } = props;

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  }

  return <List items={items} />;
}

Results.propTypes = {
  error: PropTypes.shape({
    error: PropTypes.string
  }),
  loading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

Results.defaultProps = {
  error: null
};

export default Results;
