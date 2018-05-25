import React from 'react';
import PropTypes from 'prop-types';

function QueueItem({ tune }) {
  return (
    <div>
      <img src={tune.image} alt={tune.anime} />
      <div>{tune.anime}</div>
      <div>{tune.title}</div>
      {/* tune.id */}
      <button>Play</button>
    </div>
  );
}

QueueItem.propTypes = {
  tune: PropTypes.shape().isRequired,
};

export default QueueItem;
