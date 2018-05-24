import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ListItem({ anime }) {
  return <Link to={`/anime/${anime.mal_id}`}>{anime.title}</Link>;
}

ListItem.propTypes = {
  anime: PropTypes.shape().isRequired,
};

export default ListItem;
