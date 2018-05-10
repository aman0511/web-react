import React from 'react';

import { Switch, Route } from 'react-router-dom';

import routes from 'pages/Routes';

const App = () => (
  <section>
    <Switch>
      {routes.map(route => <Route key={route.path} {...route} />)}
    </Switch>
  </section>
);

export default App;
