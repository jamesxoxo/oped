import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HomeLink = ({ className, children }) => (
  <Link className={className} to="/">
    {children}
  </Link>
);

HomeLink.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.shape().isRequired,
};

const StyledHomeLink = styled(HomeLink)`
  color: inherit;
  text-decoration: none;
`;

export default StyledHomeLink;
