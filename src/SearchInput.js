import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: decodeURI(this.props.location.search.replace('?search=', '')),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.handleSearchSubmit(this.state.value);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const { value } = this.state;

    this.props.handleSearchSubmit(value);
    this.props.history.push(`/results?search=${value}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="search">
          Search
          <input
            id="search"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

SearchInput.propTypes = {
  handleSearchSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};

export default withRouter(SearchInput);
