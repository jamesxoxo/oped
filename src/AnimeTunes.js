import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import unescape from './util/unescape';
import AnimeTune from './AnimeTune';

const List = styled.ul`
  padding-left: 0;
  margin-bottom: 0.5rem;
  list-style: none;

  &:last-child {
    margin-bottom: 0;
  }
`;

function AnimeTunes({ type, tunes, anime, image, handleAddTune }) {
  if (tunes.length) {
    return (
      <List>
        {tunes.map((tune, index) => {
          const title = unescape(
            tune
              .replace(/#[0-9]+:? /, '')
              .replace(/\(TV Broadcast[:;]?.*?\)/i, '')
              .replace(/\(((TV|BD\/DVD): )?eps? .*?\)/i, '')
              .replace(/\(Japanese version.*\)/i, '')
              .trim(),
          );

          return (
            <li key={tune}>
              <AnimeTune
                type={type}
                number={index + 1}
                title={title}
                anime={anime}
                image={image}
                handleAddTune={handleAddTune}
              />
            </li>
          );
        })}
      </List>
    );
  }

  return <div>No {type}s found.</div>;
}

AnimeTunes.propTypes = {
  type: PropTypes.string.isRequired,
  tunes: PropTypes.arrayOf(PropTypes.string).isRequired,
  anime: PropTypes.shape().isRequired,
  image: PropTypes.string.isRequired,
  handleAddTune: PropTypes.func.isRequired,
};

export default AnimeTunes;
