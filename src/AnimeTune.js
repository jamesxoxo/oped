import React, { Component } from 'react';
import PropTypes from 'prop-types';
import youtubeSearch from 'youtube-search-promise';

const API_KEY = 'AIzaSyDNS7Q_55JVp_k2lS85S36OIN1WuawqY84';

class AnimeTune extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tune: null,
    };

    this.handleAddTune = this.handleAddTune.bind(this);
  }

  componentDidMount() {
    const { title, anime, type, number } = this.props;
    const options = {
      key: API_KEY,
      maxResults: 1,
      type: 'video',
      videoEmbeddable: true,
    };

    // Search for the specific track title with artist
    youtubeSearch(title, options)
      .then(result => {
        if (result.length) {
          return result;
        }

        // Search for the top 3 OP/ED
        return youtubeSearch(`"${anime.english}" ${type} ${number}`, {
          ...options,
          maxResults: 3,
        });
      })
      .then(result => {
        if (result.length > 1) {
          // Find video titles that contain the name of the specific anime
          const matched = result.filter(
            video =>
              video.title.toLowerCase().includes(anime.english.toLowerCase()) ||
              video.title.toLowerCase().includes(anime.japanese.toLowerCase()),
          );

          if (matched.length) {
            return matched;
          }

          return [result[0]];
        }

        return result;
      })
      .then(result => {
        this.setState({ tune: result[0] });
      });
  }

  handleAddTune() {
    this.props.handleAddTune({
      id: this.state.tune.id,
      image: this.props.image,
      anime: this.props.anime.english,
      title: this.props.title,
    });
  }

  render() {
    const text = `${this.props.type}${this.props.number}: ${this.props.title}`;

    if (!this.state.tune) {
      return <span>{text}</span>;
    }

    return (
      <div>
        <span>{text}</span>
        {/* <button>Play</button> */}
        <button onClick={this.handleAddTune}>Add</button>
      </div>
    );
  }
}

AnimeTune.propTypes = {
  type: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  anime: PropTypes.shape().isRequired,
  image: PropTypes.string.isRequired,
  handleAddTune: PropTypes.func.isRequired,
};

export default AnimeTune;
