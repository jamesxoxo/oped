import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

function Results({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.mal_id}>
          <Item anime={item} />
        </li>
      ))}
    </ul>
  );
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Results;
