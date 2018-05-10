import React from 'react';

import createHistory from 'history/createBrowserHistory';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Cookies from 'universal-cookie';

import Singleton from 'lib/singleton';
import App from 'pages/App';
import configureStore from 'store';

import 'css/index.css';

const cookies = new Cookies();
const history = createHistory();
/* Images
 * This space is reserved for images that are required by server rendering,
 * e.g. the favicon and any other images that need to be in the base HTML file.
 */
import '../common/images/favicon.png';

// The root element of your app
const rootElement = document.getElementById('app');

// Creates the Redux store based on the initial state passed down by the server
// rendering.
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, history);

const singleton = new Singleton();
singleton.authorization = cookies.get('authToken', { path: '/' });

const render = (Component) => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <AppContainer>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </AppContainer>
    </Provider>,
    rootElement
  );
};

render(App);

if (module.hot) {
  // We need to re-require the main App module.
  module.hot.accept('../common/js/pages/App', () => {
    render(require('../common/js/pages/App').default);
  });
}
