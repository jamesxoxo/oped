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
  position: fixed
  right: 0;
  bottom: 71px;
  z-index: -1;
  display: ${props => (props.open ? 'block' : 'none')}
  padding: 0;
  margin-bottom: 0;
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

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <Container>
        <QueueButton
          open={this.state.open}
          handleClick={this.handleButtonClick}
        />
        <List open={this.state.open}>
          {this.props.queue.map(tune => (
            // Todo: Sort out better ids that actually work
            <Item key={tune.id}>
              <QueueItem
                tune={tune}
                controls
                handleRemove={this.props.handleRemove}
                handleSkipTo={this.props.handleSkipTo}
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
  handleRemove: PropTypes.func.isRequired,
  handleSkipTo: PropTypes.func.isRequired,
};

export default Queue;
