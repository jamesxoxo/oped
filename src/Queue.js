import React from 'react';
import PropTypes from 'prop-types';
import QueueItem from './QueueItem';

function Queue({ queue }) {
  return (
    <ul>
      {queue.map(tune => (
        <li key={tune.id}>
          <QueueItem tune={tune} />
        </li>
      ))}
    </ul>
  );
}

Queue.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Queue;
