import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import unescape from './util/unescape';

const Image = styled.img`
  margin-right: 0.5rem;
  object-fit: cover;
`;

function ResultsListItem({ anime }) {
  return (
    <Link to={`/anime/${anime.mal_id}`}>
      <Image src={anime.image_url} alt={anime.title} width="30" height="30" />
      {unescape(anime.title)}
    </Link>
  );
}

ResultsListItem.propTypes = {
  anime: PropTypes.shape().isRequired,
};

export default ResultsListItem;
