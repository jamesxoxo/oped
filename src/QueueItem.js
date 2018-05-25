import React from 'react';
import PropTypes from 'prop-types';

function QueueItem({ tune }) {
  return (
    <div>
      <img src={tune.image} alt={tune.anime} />
      <div>{tune.anime}</div>
      <div>{tune.title}</div>
    </div>
  );
}

QueueItem.propTypes = {
  tune: PropTypes.shape(),
};

QueueItem.defaultProps = {
  tune: {
    image: 'http://via.placeholder.com/225x321',
    anime: 'Nothing playing',
    title: 'Nothing playing',
  },
};

export default QueueItem;
