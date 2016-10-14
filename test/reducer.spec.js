import {List, Map, fromJS} from 'immutable';
import sinon from 'sinon';
import {expect} from 'chai';
import reducer from '../src/reducers';
import Data from './mocks/state';

let state;

describe('reducer', () => {

  beforeEach(function() {
    state = Data();
  });

  describe('Dashboard State', () => {
    it('DASHBOARD_PENDING should update dashboard loading to true', () => {
      const action = {
        type: 'DASHBOARD_PENDING'
      }
      const nextState = reducer(state, action);

      expect(nextState.reducer.get('loading').get('dashboard')).to.equal(true);
    });

    it('DASHBOARD_REJECTED should remove token and redirect to /', () => {
      localStorage.setItem('token', 'test');
      const action = {
        type: 'DASHBOARD_REJECTED'
      }
      expect(localStorage.getItem('token')).to.equal('test');
      const nextState = reducer(state, action);

      expect(localStorage.getItem('token')).to.be.undefined;
    });

    it('DASHBOARD_FULFILLED should setup state for dashboard', () => {
      const action = {
        type: 'DASHBOARD_FULFILLED',
        payload: {
          account: 'FREE',
          paid: new Date(),
          slack_webhook_url: '',
          email_pref: true,
          slack_pref: false,
          savedPackages: [],
          packages: [],
          github_token: '1234567890',
          github_repos: []
        }
      }
      const nextState = reducer(state, action);

      expect(nextState.reducer.get('account')).to.equal('FREE');
      expect(nextState.reducer.get('github').get('token')).to.equal('1234567890');
    });
  });
});
