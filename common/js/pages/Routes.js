'use strict';

import UserRoutes, { routes as UserRoutesConfig } from 'pages/users/Routes';

export const routes = UserRoutesConfig;

export default [
  {
    path: '/user',
    component: UserRoutes,
  },
];
