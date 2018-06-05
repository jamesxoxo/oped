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
