import React from 'react';
import PropTypes from 'prop-types';

function Results({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.title}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Results;
