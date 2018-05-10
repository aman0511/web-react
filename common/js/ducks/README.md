DUCKS
- Ducks is self contained isolated module to represent a node in Redux state.
- It bundles Actions, ActionTypes, Reducers & Selectors at one place.

## Responsibilities

### MUST export default a function called reducer() using 'createReducers' lib
e.g.
`
const defaultState = {
  authorization: null,
};
function LOGIN_FULFILLED_REDUCER(state, action) {
  return merge(state, {
    authorization: action.payload.auth_token,
  });
}
const handlers = {
  [LOGIN_FULFILLED]: LOGIN_FULFILLED_REDUCER,
};
export default createReducer(defaultState, handlers);
`

### MUST export its action creators as functions
e.g.
`
export function postLoginUser(data) {
  return {
    type: LOGIN,
    payload: post(constants.URLS.LOGIN, data),
  };
}
`

### MUST have action types in the form <module>/<entity>/<ACTION_TYPE>
e.g.
`const LOGIN = 'accounts/user/LOGIN';`

### MUST export its selectors as functions
e.g.
`
export const isLoggedIn = createSelector(
  userSelector,
  instance => instance.authorization,
);
`
