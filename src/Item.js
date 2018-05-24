import React from 'react';
import PropTypes from 'prop-types';

function Item({ anime }) {
  return (
    <React.Fragment>
      <a href="#">{anime.title}</a>
    </React.Fragment>
  );
}

Item.propTypes = {
  anime: PropTypes.shape({
    mal_id: PropTypes.number
  }).isRequired
};

export default Item;
