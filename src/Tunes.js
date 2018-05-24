import React from 'react';
import PropTypes from 'prop-types';

function Tunes({ type, tunes }) {
  return (
    <ul>
      {tunes.map((tune, index) => {
        const title = tune
          .replace(/#[0-9]+: /, '')
          .replace(/\(TV Broadcast:.*?\)/, '');

        return <li key={tune}>{`${type}${index + 1}: ${title}`}</li>;
      })}
    </ul>
  );
}

Tunes.propTypes = {
  type: PropTypes.string.isRequired,
  tunes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tunes;
