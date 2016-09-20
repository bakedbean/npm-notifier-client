'use strict';

import * as Immutable from 'immutable';
import fromJSOrdered from '../utils/fromjsordered';

const initialState = Immutable.fromJS({
  auth: {},
  account: '',
  email_pref: false,
  slack_pref: false,
  slack_webhook_url: '',
  packages: [],
  savedPackages: [],
  contacted: false,
  loading: {
    login: false,
    dashboard: false,
    packages: false,
    upload: false,
    account: false,
    deleting: false
  },
  alerts: {
    login: false,
    upload: false
  },
  package_view: {
    view: 'list',
    sort: {
      asc: true
    }
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
      state = setState(state, state.setIn(['alerts', 'login'], false));
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
        window.location = '/dashboard';
      } else {
        return setState(state, state.setIn(['alerts', 'login'], true));
      }

    case 'DASHBOARD_PENDING':
      return setState(state, state.setIn(['loading', 'dashboard'], true));

    case 'DASHBOARD_REJECTED':
      localStorage.removeItem('token');
      window.location = '/';

    case 'DASHBOARD_FULFILLED':
      if (!action.payload.success && action.payload.message === 'Failed to authenticate token') {
        localStorage.removeItem('token');
        window.location = '/';
      }

      return setState(state, state.withMutations(map => {
        map
          .set('account', action.payload.account)
          .set('lastPaid', action.payload.paid)
          .set('slack_webhook_url', action.payload.slack_webhook_url)
          .set('email_pref', action.payload.email_pref)
          .set('slack_pref', action.payload.slack_pref)
          .set('savedPackages', fromJSOrdered(action.payload.packages.filter(p => p._package.isValid)))
          .set('packages', fromJSOrdered(action.payload.packages))
          .setIn(['loading', 'dashboard'], false);
      }));

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

    case 'UPDATE_PREF':
      return setState(state, state.set(action.pref, action.value));
    
    case 'UPDATE_ALERT':
      return setState(state, state.setIn(['alerts', action.alert], false));

    case 'UPDATE_USER_PENDING':
      return setState(state, state.setIn(['loading', 'account'], true));

    case 'UPDATE_USER_FULFILLED':
      return setState(state, state.withMutations(map => {
        map
          .setIn(['loading', 'account'], false)
          .set('email_pref', action.payload.email_pref)
          .set('slack_pref', action.payload.slack_pref)
          .set('slack_webhook_url', action.payload.slack_webhook_url)
      }));

    case 'UPLOAD_FILE_PENDING':
      return setState(state, state.setIn(['loading', 'upload'], true));

    case 'UPLOAD_FILE_FULFILLED':
      if (action.payload.message) {
        return setState(state, state.setIn(['loading', 'upload'], false));
      }

      return setState(state, state.withMutations(map => {
        map
          .setIn(['loading', 'upload'], false)
          .setIn(['alerts', 'upload'], true)
          .set('savedPackages', fromJSOrdered(action.payload.packages.filter(p => p._package.isValid)))
          .set('packages', fromJSOrdered(action.payload.packages));
      }));

    case 'DASHBOARD_VIEW':
      return setState(state, state.setIn(['package_view', 'view'], action.view));

    case 'SORT_PACKAGES':
      state = setState(state, state.setIn(['package_view', 'sort', 'asc'], !state.getIn(['package_view', 'sort', 'asc'])));
      if (state.getIn(['package_view', 'sort', 'asc'])) {
        return setState(state, state.set('packages', state.get('packages').sortBy(p => p.get('_package').get(action.field))));
      } else {
        return setState(state, state.set('packages', state.get('packages').sortBy(p => p.get('_package').get(action.field)).reverse()));
      }

    default: return state;
  }
}
