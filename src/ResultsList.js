import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ResultsListItem from './ResultsListItem';

const List = styled.ul`
  padding-left: 0;
  list-style: none;
`;

const Item = styled.li`
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

function ResultsList({ results }) {
  // @Todo: Maybe return null if no results. Although it's possible that the
  // loading/error cases already  this
  return (
    <List>
      {results.map(result => (
        <Item key={result.mal_id}>
          <ResultsListItem anime={result} />
        </Item>
      ))}
    </List>
  );
}

ResultsList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ResultsList;
