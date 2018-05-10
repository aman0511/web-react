import path from 'path';
import Express from 'express';
import Cookies from 'universal-cookie';

import compression from 'compression';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from 'react-router';
import serveStatic from 'serve-static';

import Singleton from 'lib/singleton';
import { routes } from 'pages/Routes';
import ErrorPage from 'pages/ErrorPage';
import App from 'pages/App';
import configureStore from 'store';
import render from './render';

const { PORT, APPLICATION_PORT } = process.env;
const app = new Express();
const port = PORT || APPLICATION_PORT || 3000;

// gzip
app.use(compression());

// Use this middleware to serve up static files built into dist
app.use('/dist', serveStatic(path.join(__dirname, '../dist')));

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
  // set Cookies
  const singleton = new Singleton();
  const cookies = new Cookies(req.headers.cookie);
  singleton.authorization = cookies.get('authToken', { path: '/' });

  // const originalURL = req.url.split("?").shift();

  // This can come from the server somewhere if you want to pre-populate the
  // app's initial state.
  const initialState = {};

  // Create a new Redux store instance
  const store = configureStore(initialState);

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  // See react-router's Server Rendering section:
  // https://reacttraining.com/react-router/web/guides/server-rendering
  const matches = routes.reduce((matches, route) => {
    const { path } = route;
    const match = matchPath(req.url, { path, exact: true, strict: false });
    if (match) {
      const wc = route.component && route.component.WrappedComponent;
      matches.push({
        route,
        match,
        fetchData: (wc && wc.fetchData) || (() => Promise.resolve())
      });

    }

    return matches;
  }, []);

  // No matched route, render a 404 page.
  if (!matches.length) {
    res.status(404).send(render(<ErrorPage code={404} />, finalState));
    return;
  }

  // Otherwise, there is a match, so render the provider and router context
  const component = (
    <Provider store={store}>
      <StaticRouter context={{}} location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  // an array of fetchData promises.
  const fetchData = matches.map(match => {
    const { fetchData, ...rest } = match; // eslint-disable-line no-unused-vars

    // return fetch data Promise, excluding unnecessary fetchData method
    return match.fetchData({ store, ...rest });
  });

  // Execute the render only after all promises have been resolved.
  Promise
    .all(fetchData)
    .then(() => {
      console.log('successss');
      const state = store.getState();
      res.status(200).send(render(component, state));
    })
    .catch(() => {
      console.log('faille');
      const state = store.getState();
      res.status(200).send(render(component, state));
    });

}

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Application server mounted locally on port ${port}.`);
  }
});
