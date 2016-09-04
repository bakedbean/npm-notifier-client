'use strict';

import * as Immutable from 'immutable';
import fromJSOrdered from '../utils/fromjsordered';

const initialState = Immutable.fromJS({
  auth: {},
  loading: {}
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
      return setState(state, state.setIn(['loading'], Immutable.fromJS({
        validation: false
      })));

    default: return state;
  }
}
