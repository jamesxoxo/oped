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
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <Container>
        <QueueButton open={this.state.open} buttonClick={this.buttonClick} />
        <List open={this.state.open}>
          {this.props.queue.map(tune => (
            <Item key={tune.id}>
              <QueueItem
                tune={tune}
                controls
                removeTune={this.props.removeTune}
                skipToTune={this.props.skipToTune}
              />
            </Item>
          ))}
        </List>
      </Container>
    );
  }
}
Queue.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  removeTune: PropTypes.func.isRequired,
  skipToTune: PropTypes.func.isRequired,
};

export default Queue;
