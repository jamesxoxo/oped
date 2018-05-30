import React from 'react';
import styled from 'styled-components';

const NavBar = styled.header`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid ${props => props.theme.primary};
`;

const Logo = styled.h1`
  margin: 0;
`;

function Header() {
  return (
    <NavBar>
      <Logo>op-ed</Logo>
    </NavBar>
  );
}

export default Header;
