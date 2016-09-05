'use strict';

import * as Immutable from 'immutable';
import fromJSOrdered from '../utils/fromjsordered';

const initialState = Immutable.fromJS({
  auth: {},
  packages: [],
  loading: {
    login: false,
    dashboard: false
  }
});

function setState(state, newState) {
  return state.merge(newState);
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN_PENDING':
      return state;

    case 'LOGIN_FULFILLED':
      return setState(state, state.set('auth', Immutable.fromJS({
        email: action.payload.email
      })));

    case 'VALIDATE_PENDING':
      return setState(state, state.setIn(['loading'], Immutable.fromJS({
        validation: true
      })));

    case 'VALIDATE_FULFILLED':
      localStorage.setItem('token', action.payload.token);
      window.location = '/dashboard';

    case 'DASHBOARD_PENDING':
      return state;

    case 'DASHBOARD_FULFILLED':
      return setState(state, state.set('packages', fromJSOrdered(action.payload.packages)));

    default: return state;
  }
}
