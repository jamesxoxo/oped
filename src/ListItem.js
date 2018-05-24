import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ListItem({ anime }) {
  return <Link to={`/anime/${anime.mal_id}`}>{anime.title}</Link>;
}

ListItem.propTypes = {
  anime: PropTypes.shape({
    mal_id: PropTypes.number,
    url: PropTypes.string,
    image_url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    score: PropTypes.number,
    episodes: PropTypes.number,
    members: PropTypes.number
  }).isRequired
};

export default ListItem;
