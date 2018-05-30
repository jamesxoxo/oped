import React from 'react';
import styled from 'styled-components';

const SiteFooter = styled.footer`
  padding: 1rem;
`;

const Paragraph = styled.p`
  margin-bottom: 0;
  text-align: right;
`;

const Link = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function Footer() {
  return (
    <SiteFooter>
      <Paragraph>
        &copy;{' '}
        <Link
          href="https://github.com/jamesxoxo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          James Coventry
        </Link>
      </Paragraph>
    </SiteFooter>
  );
}

export default Footer;
