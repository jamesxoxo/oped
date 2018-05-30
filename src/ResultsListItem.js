import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import unescape from './util/unescape';

function ResultsListItem({ anime }) {
  return <Link to={`/anime/${anime.mal_id}`}>{unescape(anime.title)}</Link>;
}

ResultsListItem.propTypes = {
  anime: PropTypes.shape().isRequired,
};

export default ResultsListItem;
