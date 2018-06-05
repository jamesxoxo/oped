import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cleanTitle from './util/cleanTitle';
import AnimeTune from './AnimeTune';

const List = styled.ul`
  padding-left: 0;
  margin-bottom: 0.5rem;
  list-style: none;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Item = styled.li`
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

function AnimeTunes({ type, tunes, anime, image, malId, addTune }) {
  if (tunes.length) {
    return (
      <List>
        {tunes.map((tune, index) => (
          <Item key={tune}>
            <AnimeTune
              type={type}
              number={index + 1}
              title={cleanTitle(tune)}
              anime={anime}
              image={image}
              malId={malId}
              addTune={addTune}
            />
          </Item>
        ))}
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
  malId: PropTypes.number.isRequired,
  addTune: PropTypes.func.isRequired,
};

export default AnimeTunes;
