import React from 'react';
import PropTypes from 'prop-types';
import QueueItemControls from './QueueItemControls';

function QueueItem({ tune, controls, handleRemove }) {
  return (
    <div>
      <img src={tune.image} alt={tune.anime} />
      <div>{tune.anime}</div>
      <div>{tune.title}</div>
      {controls && (
        <QueueItemControls id={tune.id} handleRemove={handleRemove} />
      )}
    </div>
  );
}

QueueItem.propTypes = {
  tune: PropTypes.shape(),
  controls: PropTypes.bool,
  handleRemove: PropTypes.func,
};

QueueItem.defaultProps = {
  tune: {
    image: 'http://via.placeholder.com/225x321',
    anime: 'Nothing playing',
    title: 'Nothing playing',
  },
  controls: false,
  handleRemove: null,
};

export default QueueItem;
