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
    if (prevProps.match.params.mal_id !== this.props.match.params.mal_id) {
      this.loadAnime();
    }
  }

  loadAnime() {
    this.setState({
      anime: null,
    });
    fetch(`https://api.jikan.moe/anime/${this.props.match.params.mal_id}`)
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
    return (
      <AnimeInfo
        anime={this.state.anime}
        error={this.state.error}
        queue={this.props.queue}
        loaded={this.props.loaded}
        playing={this.props.playing}
        togglePlay={this.props.togglePlay}
        addTune={this.props.addTune}
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
