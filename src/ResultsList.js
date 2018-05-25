import React from 'react';
import PropTypes from 'prop-types';
import ResultsListItem from './ResultsListItem';

function ResultsList({ items }) {
  // Todo: Maybe return null if no items. Although it's possible that the
  // loading/error cases already handle this
  return (
    <ul>
      {items.map(item => (
        <li key={item.mal_id}>
          <ResultsListItem anime={item} />
        </li>
      ))}
    </ul>
  );
}

ResultsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ResultsList;
