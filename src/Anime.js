import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnimeInfo from './AnimeInfo';

class Anime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      anime: null,
    };

    this.loadAnime = this.loadAnime.bind(this);
  }

  componentDidMount() {
    this.loadAnime();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;

    if (prevProps.match.params.mal_id !== match.params.mal_id) {
      this.loadAnime();
    }
  }

  loadAnime() {
    const { match } = this.props;

    this.setState({
      anime: null,
    });
    fetch(`https://api.jikan.moe/anime/${match.params.mal_id}`)
      .then(res => res.json())
      .then(
        result => {
          if ('error' in result) {
            this.setState({
              ...result,
            });
          } else {
            this.setState({
              anime: result,
            });
          }
        },
        error => {
          this.setState({
            error,
          });
        },
      );
  }

  render() {
    const { queue, loaded, playing, togglePlay, addTune } = this.props;
    const { anime, error } = this.state;

    return (
      <AnimeInfo
        anime={anime}
        error={error}
        queue={queue}
        loaded={loaded}
        playing={playing}
        togglePlay={togglePlay}
        addTune={addTune}
      />
    );
  }
}
Anime.propTypes = {
  match: PropTypes.shape().isRequired,
  queue: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loaded: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
  addTune: PropTypes.func.isRequired,
};

export default Anime;
