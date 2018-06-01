import React from 'react';
import PropTypes from 'prop-types';
import ResultsListItem from './ResultsListItem';

function ResultsList({ results }) {
  // Todo: Maybe return null if no results. Although it's possible that the
  // loading/error cases already  this
  return (
    <ul>
      {results.map(result => (
        <li key={result.mal_id}>
          <ResultsListItem anime={result} />
        </li>
      ))}
    </ul>
  );
}

ResultsList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ResultsList;
