import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QueueButton from './QueueButton';
import QueueItem from './QueueItem';

const Container = styled.div`
  position: relative;
  margin-left: 1rem;
`;

const List = styled.ul`
  position: fixed;
  right: 0;
  bottom: 71px;
  z-index: -1;
  display: ${props => (props.open ? 'block' : 'none')};
  height: 239px;
  padding: 0;
  margin-bottom: 0;
  overflow-y: scroll;
  list-style: none;
  background-color: #fff;
  border: 1px solid ${props => props.theme.primary};
  border-bottom: 0;
`;

const Item = styled.li`
  margin: 0.5rem;

  &:first-child {
    font-weight: bold;
  }
`;

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    const { open } = this.state;

    this.setState({
      open: !open,
    });
  }

  render() {
    const {
      queue,
      loaded,
      playing,
      togglePlay,
      removeTune,
      skipToTune,
    } = this.props;
    const { open } = this.state;

    return (
      <Container>
        <QueueButton open={open} buttonClick={this.buttonClick} />
        <List open={open}>
          {queue.map((tune, index) => (
            <Item key={tune.id}>
              <QueueItem
                controls
                tune={tune}
                first={index === 0}
                loaded={loaded}
                playing={playing}
                togglePlay={togglePlay}
                removeTune={removeTune}
                skipToTune={skipToTune}
              />
            </Item>
          ))}
        </List>
      </Container>
    );
  }
}
Queue.propTypes = {
  loaded: PropTypes.bool.isRequired,
  queue: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  playing: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
  removeTune: PropTypes.func.isRequired,
  skipToTune: PropTypes.func.isRequired,
};

export default Queue;
