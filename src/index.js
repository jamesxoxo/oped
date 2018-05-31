import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import { injectGlobal } from 'styled-components';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

injectGlobal([
  `
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    overflow-y: scroll;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top 0;
    margin-bottom: .5rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ol,
  ul,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ol ol,
  ul ul,
  ol ul,
  ul ol {
    margin-bottom: 0;
  }

  dt {
    font-weight: 700;
  }

  dd {
    margin-bottom: .5rem;
    margin-left: 0;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    vertical-align: middle;
  }

  label {
    display: inline-block;
    margin-bottom: .5rem;
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
`,
]);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
