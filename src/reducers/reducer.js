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

export default function patientReducer(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN_FULFILLED':
      console.log(action.payload);
      return state;

    default: return state;
  }
}
