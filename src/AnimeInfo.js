import React from 'react';
import PropTypes from 'prop-types';
import unescape from './unescape';
import Tunes from './Tunes';

function AnimeInfo({ anime, error }) {
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (anime) {
    return (
      <div>
        <h2>{unescape(anime.title)}</h2>
        <h3>{unescape(anime.title_japanese)}</h3>
        <div>
          <h4>Tunes</h4>
          <Tunes
            type="OP"
            tunes={anime.opening_theme}
            anime={{ english: anime.title, japanese: anime.title_japanese }}
          />
          <Tunes
            type="ED"
            tunes={anime.ending_theme}
            anime={{ english: anime.title, japanese: anime.title_japanese }}
          />
        </div>
        <p>{unescape(anime.synopsis)}</p>
        <dl>
          <dt>type</dt>
          <dd>{anime.type}</dd>
          <dt>episodes</dt>
          <dd>{anime.episodes}</dd>
          <dt>status</dt>
          <dd>{anime.status}</dd>
          {/*
          <dt>aired</dt>
          <dd>
            {anime.aired.from} - {anime.aired.to}
          </dd>
          */}
          <dt>aired</dt>
          <dd>
            {anime.aired.from !== anime.aired.to
              ? `${anime.aired.from} - ${anime.aired.to}`
              : anime.aired.from}
          </dd>
          <dt>duration</dt>
          <dd>{anime.duration}</dd>
        </dl>
      </div>
    );
  }

  return <div>Loading...</div>;
}

AnimeInfo.propTypes = {
  error: PropTypes.shape(),
  anime: PropTypes.shape(),
};

AnimeInfo.defaultProps = {
  error: null,
  anime: null,
};

export default AnimeInfo;
