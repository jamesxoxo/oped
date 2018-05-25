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
  tune: PropTypes.shape().isRequired,
};

export default QueueItem;
