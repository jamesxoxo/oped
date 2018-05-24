import React from 'react';
import PropTypes from 'prop-types';
import unescape from './unescape';
import Tune from './Tune';

function Tunes({ type, tunes, anime }) {
  return (
    <ul>
      {tunes.map((tune, index) => {
        const title = unescape(
          tune
            .replace(/#[0-9]+:? /, '')
            .replace(/\(TV Broadcast:.*?\)/, '')
            .replace(/\(eps? .*?\)/, ''),
        );

        return (
          <li key={tune}>
            <Tune type={type} number={index + 1} title={title} anime={anime} />
          </li>
        );
      })}
    </ul>
  );
}

Tunes.propTypes = {
  type: PropTypes.string.isRequired,
  tunes: PropTypes.arrayOf(PropTypes.string).isRequired,
  anime: PropTypes.string.isRequired,
};

export default Tunes;
