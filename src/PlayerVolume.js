import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faVolumeUp from '@fortawesome/fontawesome-free-solid/faVolumeUp';
import faVolumeDown from '@fortawesome/fontawesome-free-solid/faVolumeDown';
import faVolumeOff from '@fortawesome/fontawesome-free-solid/faVolumeOff';
import Button from './theme/Button';

const VolumeControls = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;

const VolumeSliderPanel = styled.div`
  position: absolute;
  top: -129px;
  left: calc(50% - 22px);
  display: ${props => (props.hovering ? 'flex' : 'none')};
  align-items: center;
  height: 44px;
  padding: 0.5rem;
  background-color: #fff;
  border-top: 1px solid ${props => props.theme.primary};
  border-bottom: 1px solid ${props => props.theme.primary};
  border-right: 1px solid ${props => props.theme.primary};
  transform: rotate(-90deg);
  transform-origin: 64.5px 64.5px;
`;

const VolumeSlider = styled.input`
  width: 129px;
`;

const VolumeButton = Button.extend`
  width: 44px;
`;

class PlayerVolume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleMouseEnter() {
    this.setState({
      hovering: true,
    });
  }

  handleMouseLeave() {
    this.setState({
      hovering: false,
    });
  }

  handleChange(event) {
    this.props.setVolume(parseInt(event.target.value, 10));
  }

  handleClick() {
    if (this.props.volume > 0) {
      this.props.setVolume(0);
    } else {
      this.props.setVolume(this.props.prevVolume);
    }
  }

  render() {
    let icon = faVolumeUp;

    if (this.props.volume < 50) {
      icon = faVolumeDown;
    }

    if (this.props.volume === 0) {
      icon = faVolumeOff;
    }

    return (
      <VolumeControls
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <VolumeSliderPanel hovering={this.state.hovering}>
          <VolumeSlider
            type="range"
            value={this.props.volume}
            min="0"
            max="100"
            onChange={this.handleChange}
          />
        </VolumeSliderPanel>
        <VolumeButton onClick={this.handleClick}>
          <FontAwesomeIcon icon={icon} />
        </VolumeButton>
      </VolumeControls>
    );
  }
}

PlayerVolume.propTypes = {
  volume: PropTypes.number.isRequired,
  prevVolume: PropTypes.number,
  setVolume: PropTypes.func.isRequired,
};
PlayerVolume.defaultProps = {
  prevVolume: null,
};

export default PlayerVolume;
