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
    const { location } = this.props;

    this.state = {
      value: decodeURI(location.search.replace('?search=', '')),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { search } = this.props;
    const { value } = this.state;

    search(value);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleFocus() {
    const { updateState } = this.props;

    updateState({
      inputFocused: true,
    });
  }

  handleBlur() {
    const { updateState } = this.props;

    updateState({
      inputFocused: false,
    });
  }

  handleSubmit(event) {
    const { search } = this.props;
    const { value } = this.state;

    search(value);
    event.preventDefault();
  }

  render() {
    const { value } = this.state;

    return (
      // @Todo: Maybe have a way to load in your anime list
      <Form onSubmit={this.handleSubmit}>
        <Label htmlFor="search">
          <ScreenReader>Search</ScreenReader>
          <SearchInput
            id="search"
            type="text"
            value={value}
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
