import React from 'react';
import PropTypes from 'prop-types';
import QueueItemControls from './QueueItemControls';

function QueueItem({ tune, controls, handleRemove, handleSkipTo }) {
  return (
    <div>
      <img src={tune.image} alt={tune.anime} />
      <div>{tune.anime}</div>
      <div>{tune.title}</div>
      {controls && (
        <QueueItemControls
          id={tune.id}
          handleRemove={handleRemove}
          handleSkipTo={handleSkipTo}
        />
      )}
    </div>
  );
}

QueueItem.propTypes = {
  tune: PropTypes.shape(),
  controls: PropTypes.bool,
  handleRemove: PropTypes.func,
  handleSkipTo: PropTypes.func,
};
QueueItem.defaultProps = {
  tune: {
    image: 'http://via.placeholder.com/225x321',
    anime: '',
    title: 'Nothing playing',
  },
  controls: false,
  handleRemove: null,
  handleSkipTo: null,
};

export default QueueItem;
