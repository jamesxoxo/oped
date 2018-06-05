import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import unescape from './util/unescape';
import QueueItemControls from './QueueItemControls';

const Item = styled.div`
  display: ${props => (props.single ? 'none' : 'flex')};
  align-items: center;

  @media (min-width: 823px) {
    display: flex;
  }
`;

const Image = styled.img`
  margin-right: 0.5rem;
  object-fit: cover;
`;

const Text = styled.div`
  width: 240px;
  overflow: hidden;
  font-size: 0.8rem;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function QueueItem({ tune, controls, removeTune, skipToTune }) {
  return (
    <Item single={!controls}>
      <Image src={tune.image} alt={tune.anime} width="38" height="38" />
      <div>
        <Text>
          <Link to={`/anime/${tune.malId}`}>{unescape(tune.anime)}</Link>
        </Text>
        <Text title={unescape(tune.title)}>{unescape(tune.title)}</Text>
      </div>
      {controls && (
        <QueueItemControls
          id={tune.id}
          removeTune={removeTune}
          skipToTune={skipToTune}
        />
      )}
    </Item>
  );
}
QueueItem.propTypes = {
  tune: PropTypes.shape(),
  controls: PropTypes.bool,
  removeTune: PropTypes.func,
  skipToTune: PropTypes.func,
};
QueueItem.defaultProps = {
  tune: {
    image: 'http://via.placeholder.com/225x321',
    anime: '',
    title: 'Nothing playing',
  },
  controls: false,
  removeTune: null,
  skipToTune: null,
};

export default QueueItem;
