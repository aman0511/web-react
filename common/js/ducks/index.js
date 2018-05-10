import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import your reducers here
import users from './users';

const appReducer = combineReducers({
  form: formReducer,
  routes: routerReducer,
  users,
});

const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === 'accounts/user/RESET_STATE') {
    newState = undefined;
  }
  return appReducer(newState, action);
};

export default rootReducer;
