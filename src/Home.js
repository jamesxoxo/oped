/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';
import mp4 from './nonon.mp4';
import webm from './nonon.webm';

function Home() {
  return (
    <article>
      <h1>Welcome</h1>
      <p>
        This website is to help you listen to anime opening/ending songs. Use
        the search box above to get started.
      </p>
      <p>It relies on the MAL API so if that goes down this goes down.</p>
      <video autoPlay loop muted>
        <source src={mp4} type="video/mp4" />
        <source src={webm} type="video/webm" />
      </video>
    </article>
  );
}

export default Home;
