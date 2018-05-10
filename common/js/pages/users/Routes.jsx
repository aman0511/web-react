import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import UserFormPage from './Form';
import UserListPage from './List';
import ErrorPage from '../ErrorPage';

export const routes = [
  {
    exact: true,
    redirect: true,
    name: 'user',
    path: '/user',
    from: '/user',
    navKey: 'user.list',
    to: '/user/list',
  },
  {
    component: UserListPage,
    exact: true,
    name: 'user.list',
    navKey: 'user.list',
    path: '/user/list',
  },
  {
    component: UserFormPage,
    exact: true,
    name: 'user.add',
    navKey: 'user.add',
    path: '/user/add',
  },
  {
    path: '*',
    component: ErrorPage,
    name: '404',
  },
];

const UserRoutes = () => (
  <Switch>
    {routes.map(route => route.redirect
      ? <Redirect key={route.name} {...route} />
      : <Route key={route.name} {...route} />
    )}
  </Switch>
);

export default UserRoutes;
