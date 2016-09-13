'use strict';

import * as Immutable from 'immutable';
import fromJSOrdered from '../utils/fromjsordered';

const initialState = Immutable.fromJS({
  auth: {},
  account: '',
  packages: [],
  savedPackages: [],
  contacted: false,
  loading: {
    login: false,
    dashboard: false,
    packages: false,
    deleting: false
  }
});

function setState(state, newState) {
  return state.merge(newState);
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'PURCHASE_UNLIMITED_PENDING':
    case 'LOGIN_PENDING':
      return state;

    case 'PURCHASE_UNLIMITED_FULFILLED':
    case 'LOGIN_FULFILLED':
      return setState(state, state.set('auth', Immutable.fromJS({
        email: action.payload.email
      })));

    case 'VALIDATE_PENDING':
      return setState(state, state.setIn(['loading'], Immutable.fromJS({
        validation: true
      })));

    case 'VALIDATE_FULFILLED':
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
      }
      window.location = '/dashboard';

    case 'DASHBOARD_PENDING':
      return setState(state, state.setIn(['loading', 'dashboard'], true));

    case 'DASHBOARD_FULFILLED':
      state = setState(state, state.setIn(['loading', 'dashboard'], false));
      state = setState(state, state.set('account', action.payload.account));
      state = setState(state, state.set('lastPaid', action.payload.paid));
      state = setState(state, state.set('savedPackages', fromJSOrdered(action.payload.packages)));
      return setState(state, state.set('packages', fromJSOrdered(action.payload.packages)));

    case 'PACKAGE_ADD':
      return setState(state, state.set('packages', state.get('packages').push(Immutable.fromJS({ _package: { name: '', isValid: true } }))));

    case 'PACKAGE_REMOVE':
      return setState(state, state.set('packages', state.get('packages').delete(action.index)));

    case 'PACKAGE_UPDATE':
      return setState(state, state.setIn(['packages', action.index], Immutable.fromJS({ _package: { name: action.name, isValid: true } })));

    case 'PACKAGES_RESET':
      return setState(state, state.set('packages', state.get('savedPackages')));

    case 'PACKAGES_SAVE_PENDING':
    case 'UPDATE_PACKAGE_PENDING':
      return setState(state, state.setIn(['loading', 'packages'], true));

    case 'PACKAGES_SAVE_FULFILLED':
      return setState(state, state.withMutations(map => {
        map
          .setIn(['loading', 'packages'], false)
          .set('savedPackages', fromJSOrdered(action.payload.packages.filter(p => p._package.isValid)))
          .set('packages', fromJSOrdered(action.payload.packages));
      }));

    case 'UPDATE_PACKAGE_FULFILLED':
      return setState(state, state.withMutations(map => {
        map
          .setIn(['loading', 'packages'], false)
          .set('savedPackages', fromJSOrdered(action.payload.packages))
          .set('packages', fromJSOrdered(action.payload.packages));
      }));

    case 'TRACK_DELETED_PACKAGE':
      return setState(state, state.setIn(['loading', 'deleting'], action.id));

    case 'DELETE_PACKAGE_FROM_API_FULFILLED':
      return setState(state, state.withMutations(map => {
        map
          .setIn(['loading', 'deleting'], false)
          .set('savedPackages', fromJSOrdered(action.payload.packages))
          .set('packages', fromJSOrdered(action.payload.packages));
      }));

    case 'SEARCH_PACKAGES':
      let packages = state.get('savedPackages').filter(p => {
        if (p.get('_package').get('name').search(action.needle) >= 0) return p;
      });
      if (packages.size < 1) {
        packages = [{
          _package: {
            name: 'No matches found.',
            version: ''
          }
        }];
      }
      return setState(state, state.set('packages', fromJSOrdered(packages)));

    case 'SEND_CONTACT_FULFILLED':
      return setState(state, state.set('contacted', true));

    default: return state;
  }
}
