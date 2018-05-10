import { createSelector } from 'reselect';
import { merge } from 'ramda';

import { fetch, put, post, remove } from 'lib/api';
import createReducer from 'lib/createReducer';
import constants from './constants';

const GET_USERS = 'users/user/GET_USERS';
const GET_USERS_FULFILLED = 'users/user/GET_USERS_FULFILLED';
const SELECT_USERS = 'users/user/SELECT_USERS';
const GET_USER = 'users/user/GET_USER';
const GET_USER_FULFILLED = 'users/user/GET_USER_FULFILLED';
const POST_USER = 'users/user/POST_USER';
const POST_USER_FULFILLED = 'users/user/POST_USER_FULFILLED';
const PUT_USER = 'users/user/PUT_USER';
const PUT_USER_FULFILLED = 'users/user/PUT_USER_FULFILLED';
const DELETE_USERS = 'users/user/DELETE_USERS';
const DELETE_USERS_FULFILLED = 'users/user/DELETE_USERS_FULFILLED';
const ACTIVATE_USERS = 'users/user/ACTIVATE_USERS';
const ACTIVATE_USERS_FULFILLED = 'users/user/ACTIVATE_USERS_FULFILLED';
const DEACTIVATE_USERS = 'users/user/DEACTIVATE_USERS';
const DEACTIVATE_USERS_FULFILLED = 'users/user/DEACTIVATE_USERS_FULFILLED';

export function getUsers(params) {
  return {
    type: GET_USERS,
    payload: fetch(constants.URLS.USER, { params }),
  };
}

export function selectUsers(data) {
  return {
    type: SELECT_USERS,
    payload: data,
  };
}

export function getUser(params) {
  return {
    type: GET_USER,
    payload: fetch(`${constants.URLS.USER}${params.id}/`),
  };
}

export function postUser(data) {
  return {
    type: POST_USER,
    payload: post(constants.URLS.USER, data),
  };
}

export function putUser(data) {
  return {
    type: PUT_USER,
    payload: put(`${constants.URLS.USER}${data.id}/`, data),
  };
}

export function deleteUser(data) {
  return {
    type: DELETE_USERS,
    payload: post(`${constants.URLS.USER}${constants.URLS.DELETE}`, { users: data }),
  };
}

export function activateUser(data) {
  return {
    type: ACTIVATE_USERS,
    payload: post(`${constants.URLS.USER}${constants.URLS.ACTIVATE}`, { users: data }),
  };
}

export function deactivateUser(data) {
  return {
    type: DEACTIVATE_USERS,
    payload: post(`${constants.URLS.USER}${constants.URLS.DEACTIVATE}`, { users: data }),
  };
}


const defaultState = {
  list: [],
  detail: {},
};

function GET_USERS_FULFILLED_REDUCER(state, action) {
  const arr = action.payload.map(item => ({ ...item, checked: false }));
  return merge(state, {
    list: arr,
  });
}

function SELECT_USERS_REDUCER(state, action) {
  const list = [ ...state.list ];
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].id === action.payload.id) {
      list[i].checked = !list[i].checked;
    }
  }
  return merge(state, { list });
}

function GET_USER_FULFILLED_REDUCER(state, action) {
  return merge(state, {
    detail: action.payload,
  });
}

function POST_USER_FULFILLED_REDUCER(state, action) {
  return merge(state, {
    detail: action.payload,
  });
}

function PUT_USER_FULFILLED_REDUCER(state, action) {
  return merge(state, {
    detail: action.payload,
  });
}

function DELETE_USERS_FULFILLED_REDUCER(state, action) {
  const list = state.list.filter(item => !item.checked);
  return merge(state, { list });
}

function ACTIVATE_USERS_FULFILLED_REDUCER(state, action) {
  const list = state.list.map(item => ({ ...item, is_active: item.checked ? true : item.is_active }));
  return merge(state, { list });
}

function DEACTIVATE_USERS_FULFILLED_REDUCER(state, action) {
  const list = state.list.map(item => ({ ...item, is_active: item.checked ? false : item.is_active }));
  return merge(state, { list });
}

const handlers = {
  [GET_USERS_FULFILLED]: GET_USERS_FULFILLED_REDUCER,
  [SELECT_USERS]: SELECT_USERS_REDUCER,
  [GET_USER_FULFILLED]: GET_USER_FULFILLED_REDUCER,
  [POST_USER_FULFILLED]: POST_USER_FULFILLED_REDUCER,
  [PUT_USER_FULFILLED]: PUT_USER_FULFILLED_REDUCER,
  [DELETE_USERS_FULFILLED]: DELETE_USERS_FULFILLED_REDUCER,
  [ACTIVATE_USERS_FULFILLED]: ACTIVATE_USERS_FULFILLED_REDUCER,
  [DEACTIVATE_USERS_FULFILLED]: DEACTIVATE_USERS_FULFILLED_REDUCER,
};


const userSelector = state => state.users.user;

export const userList = createSelector(
  userSelector,
  instance => instance.list,
);

export const userSelectedList = createSelector(
  userList,
  instance => instance.filter(item => item.checked).map(item => item.id),
);

export const userDetail = createSelector(
  userSelector,
  instance => instance.detail,
);

export default createReducer(defaultState, handlers);
