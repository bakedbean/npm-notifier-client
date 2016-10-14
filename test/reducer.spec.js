import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducers';
import Data from './mocks/state';

let state;

describe('reducer', () => {

  beforeEach(function() {
    state = Data();
  });

  describe('Dashboard State', () => {
    it('handles DASHBOARD_PENDING by updating loading to true', () => {
      const action = {
        type: 'DASHBOARD_PENDING'
      }
      const nextState = reducer(state, action);

      expect(nextState.reducer.get('loading').get('dashboard')).to.equal(true);
    });
  });
});
