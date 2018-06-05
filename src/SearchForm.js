import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ScreenReader from './theme/ScreenReader';
import FormControl from './theme/FormControl';
import Button from './theme/Button';

const Form = styled.form`
  display: flex;
  flex-grow: 1;
  margin-left: 1rem;
`;

const Label = styled.label`
  flex-grow: 1;
  margin-bottom: 0;
`;

const SearchInput = FormControl.extend`
  border-right: 0;
`;

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: decodeURI(this.props.location.search.replace('?search=', '')),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.search(this.state.value);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleFocus() {
    this.props.updateState({
      inputFocused: true,
    });
  }

  handleBlur() {
    this.props.updateState({
      inputFocused: false,
    });
  }

  handleSubmit(event) {
    this.props.search(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      // @Todo: Maybe have a way to load in your anime list
      <Form onSubmit={this.handleSubmit}>
        <Label htmlFor="search">
          <ScreenReader>Search</ScreenReader>
          <SearchInput
            id="search"
            type="text"
            value={this.state.value}
            placeholder="Name of anime"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </Label>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}
SearchForm.propTypes = {
  location: PropTypes.shape().isRequired,
  search: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired,
};

export default withRouter(SearchForm);
