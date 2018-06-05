import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

function Header({ updateState }) {
  return (
    <SiteHeader>
      <Link to="/">
        <Logo>op-ed</Logo>
      </Link>
      <Search updateState={updateState} />
    </SiteHeader>
  );
}
Header.propTypes = {
  updateState: PropTypes.func.isRequired,
};

export default Header;
