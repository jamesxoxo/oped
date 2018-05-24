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
  }

  componentDidMount() {
    fetch(`https://api.jikan.moe/anime/${this.props.match.params.mal_id}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            anime: result,
          });
        },
        error => {
          this.setState({
            error,
          });
        },
      );
  }

  render() {
    return <AnimeInfo anime={this.state.anime} error={this.state.error} />;
  }
}

Anime.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Anime;