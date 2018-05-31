import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import unescape from './util/unescape';
import QueueItemControls from './QueueItemControls';

const Item = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 38px;
  height: 38px;
  margin-right: 0.5rem;
  object-fit: cover;
`;

const Text = styled.div`
  max-width: 240px;
  overflow: hidden;
  font-size: 0.8rem;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function QueueItem({ tune, controls, handleRemove, handleSkipTo }) {
  return (
    <Item>
      <Image src={tune.image} alt={tune.anime} />
      <div>
        <Text>
          <Link title={unescape(tune.anime)} to={`/anime/${tune.malId}`}>
            {unescape(tune.anime)}
          </Link>
        </Text>
        <Text title={unescape(tune.title)}>{unescape(tune.title)}</Text>
      </div>
      {controls && (
        <QueueItemControls
          id={tune.id}
          handleRemove={handleRemove}
          handleSkipTo={handleSkipTo}
        />
      )}
    </Item>
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
