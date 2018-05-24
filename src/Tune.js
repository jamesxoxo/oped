import React, { Component } from 'react';
import PropTypes from 'prop-types';
import youtubeSearch from 'youtube-search-promise';

const API_KEY = 'AIzaSyDNS7Q_55JVp_k2lS85S36OIN1WuawqY84';

class Tune extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: null,
    };
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
      .then(result => result[0] && result[0].link)
      .then(result => {
        this.setState({ link: result });
      });
  }

  render() {
    const text = `${this.props.type}${this.props.number}: ${this.props.title}`;

    if (!this.state.link) {
      return <span>{text}</span>;
    }

    return (
      <a href={this.state.link} target="_blank">
        {text}
      </a>
    );
  }
}

Tune.propTypes = {
  type: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  anime: PropTypes.shape().isRequired,
};

export default Tune;
