'use strict';

import * as Immutable from 'immutable';
import fromJSOrdered from '../utils/fromjsordered';

const initialState = Immutable.fromJS({
  loading: {
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
      return setState(state, state.set('code', action.payload.code));

    default: return state;
  }
}
