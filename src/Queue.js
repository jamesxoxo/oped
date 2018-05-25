import React from 'react';
import PropTypes from 'prop-types';
import QueueItem from './QueueItem';

function Queue({ queue, handleRemove, handleSkipTo }) {
  return (
    <ul>
      {queue.map(tune => (
        <li key={tune.id}>
          <QueueItem
            tune={tune}
            controls
            handleRemove={handleRemove}
            handleSkipTo={handleSkipTo}
          />
        </li>
      ))}
    </ul>
  );
}

Queue.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleSkipTo: PropTypes.func.isRequired,
};

export default Queue;
