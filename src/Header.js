import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyledHomeLink from './HeaderHomeLink';
import Search from './Search';

const SiteHeader = styled.header`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid ${props => props.theme.primary};
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1rem;
`;

function Header({ handleSearchSubmit }) {
  return (
    <SiteHeader>
      <StyledHomeLink>
        <Logo>op-ed</Logo>
      </StyledHomeLink>
      <Search handleSearchSubmit={handleSearchSubmit} />
    </SiteHeader>
  );
}

Header.propTypes = {
  handleSearchSubmit: PropTypes.func.isRequired,
};

export default Header;
