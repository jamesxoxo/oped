import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import unescape from './util/unescape';
import AnimeTunes from './AnimeTunes';

const Article = styled.article`
  display: flex;
  align-items: flex-start;
`;

const Data = styled.div`
  margin-right: 1rem;
`;

const Image = styled.img`
  margin-bottom: 1rem;
`;

const Info = styled.div`
  flex-grow: 1;
`;

const Tunes = styled.div`
  padding: 1rem;
  margin: 1rem 0;
`;

function AnimeInfo({
  anime,
  error,
  queue,
  loaded,
  playing,
  togglePlay,
  addTune,
}) {
  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }
  if (anime) {
    return (
      <Article>
        <Data>
          <Image
            src={anime.image_url}
            alt={unescape(anime.title)}
            width="225"
            height="311"
          />
          <dl>
            <dt>Type</dt>
            <dd>{anime.type}</dd>
            <dt>Episodes</dt>
            <dd>{anime.episodes}</dd>
            <dt>Status</dt>
            <dd>{anime.status}</dd>
            <dt>Aired</dt>
            <dd>{anime.aired_string}</dd>
          </dl>
        </Data>
        <Info>
          <h2>{unescape(anime.title)}</h2>
          <h3>{unescape(anime.title_japanese)}</h3>
          <Tunes>
            <h4>Tunes</h4>
            <AnimeTunes
              type="OP"
              tunes={anime.opening_theme}
              anime={{ english: anime.title, japanese: anime.title_japanese }}
              image={anime.image_url}
              malId={anime.mal_id}
              queue={queue}
              loaded={loaded}
              playing={playing}
              togglePlay={togglePlay}
              addTune={addTune}
            />
            <AnimeTunes
              type="ED"
              tunes={anime.ending_theme}
              anime={{ english: anime.title, japanese: anime.title_japanese }}
              image={anime.image_url}
              malId={anime.mal_id}
              queue={queue}
              loaded={loaded}
              playing={playing}
              togglePlay={togglePlay}
              addTune={addTune}
            />
          </Tunes>
          <p>
            {unescape(anime.synopsis)
              .replace('[Written by MAL Rewrite]', '')
              .trim()}
          </p>
        </Info>
      </Article>
    );
  }

  return <div>Loading...</div>;
}
AnimeInfo.propTypes = {
  error: PropTypes.shape(),
  anime: PropTypes.shape(),
  queue: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loaded: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
  addTune: PropTypes.func.isRequired,
};
AnimeInfo.defaultProps = {
  error: null,
  anime: null,
};

export default AnimeInfo;
