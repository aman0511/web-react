import queryString from 'query-string';
import { createSelector } from 'reselect';

// Selectors
const routeSelector = state => state.routes;

export const location = createSelector(
  routeSelector,
  route => {
    const routeLocation = {
      ...route.location,
      query: route.location && queryString.parse(route.location.search),
    };
    return routeLocation;
  },
);

export default { location };
