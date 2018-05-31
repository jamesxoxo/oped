import React from 'react';
import styled from 'styled-components';

const SiteFooter = styled.footer`
  padding: 1rem;
`;

const Paragraph = styled.p`
  margin-bottom: 0;
  text-align: right;
`;

function Footer() {
  return (
    <SiteFooter>
      <Paragraph>
        &copy;{' '}
        <a
          href="https://github.com/jamesxoxo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          James Coventry
        </a>
      </Paragraph>
    </SiteFooter>
  );
}

export default Footer;
