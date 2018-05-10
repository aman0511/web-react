/**
 * 404.js
 * Renders a 404 page.
 */

import React from 'react';
import PropTypes from 'prop-types';

const ERROR_MESSAGES = {
  404: 'Sorry, we can\'t find the page you are looking for.',
  500: 'Sorry, The server encountered an error.',
};

const ErrorPage = (props) => {
  const { message, code } = props;

  return (
    <section className="vh-100">
      <header className="tc ph5 lh-copy">
        <h1 className="f1 f-headline-l code mb3 fw9 dib tracked-tight light-purple">{code}</h1>
        <h2 className="tc f1-l fw1">{message}</h2>
      </header>
      <ul className="list tc pl0 w-100 mt5">
        <li className="dib">
          <a className="f5 f4-ns link black db pv2 ph3 hover-light-purple" href="/Dashboard">Go Back to Dashboard</a>
        </li>
      </ul>
    </section>
  );
};

ErrorPage.propTypes = {
  code: PropTypes.number,
  message: PropTypes.string,
};

ErrorPage.defaultProps = {
  code: 404,
  message: ERROR_MESSAGES[404],
};

export default ErrorPage;
