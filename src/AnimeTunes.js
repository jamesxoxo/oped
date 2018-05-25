import React from 'react';
import PropTypes from 'prop-types';
import unescape from './unescape';
import AnimeTune from './AnimeTune';

function AnimeTunes({ type, tunes, anime }) {
  if (tunes.length) {
    return (
      <ul>
        {tunes.map((tune, index) => {
          const title = unescape(
            tune
              .replace(/#[0-9]+:? /, '')
              .replace(/\(TV Broadcast[:;]?.*?\)/i, '')
              .replace(/\(((TV|BD\/DVD): )?eps? .*?\)/i, '')
              .replace(/\(Japanese version.*\)/i, ''),
          );

          return (
            <li key={tune}>
              <AnimeTune
                type={type}
                number={index + 1}
                title={title}
                anime={anime}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  return <div>No {type}s found.</div>;
}

AnimeTunes.propTypes = {
  type: PropTypes.string.isRequired,
  tunes: PropTypes.arrayOf(PropTypes.string).isRequired,
  anime: PropTypes.shape().isRequired,
};

export default AnimeTunes;