'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import {fromJS, List} from 'immutable';
import {shallow} from 'enzyme';
import DashboardStart from '../../src/components/DashboardStart';
import {expect} from 'chai';
import Data from '../mocks/state';
import Package from '../mocks/package';

let state;

describe('<DashboardStart />', () => {
  beforeEach(function() {
    state = {
      auth: Data().reducer.get('auth'),
      account: Data().reducer.get('account'),
      packages: Data().reducer.get('packages'),
      savedPackages: Data().reducer.get('savedPackages'),
      loading: Data().reducer.get('loading'),
      removePackage: sinon.spy(),
      packageUpdate: sinon.spy(),
      package: fromJS({ _package: { name: 'react', isValid: false } }),
      toggleAddPackages: sinon.spy(),
      toggleFileUpload: sinon.spy()
    }
  });

  it('should not show start buttons', () => {
    state.loading = state.loading.set('dashboard', true);
    const wrapper = shallow(<DashboardStart {...state} />);
    expect(wrapper.find('button')).to.have.length(0);
    expect(wrapper.find('h1')).to.have.length(1);
  });

  it('should show manual start button', () => {
    const wrapper = shallow(<DashboardStart {...state} />);
    expect(wrapper.find('button')).to.have.length(2);
  });

  it('should show manual and upload start buttons', () => {
    state.account = 'PAID';
    const wrapper = shallow(<DashboardStart {...state} />);
    expect(wrapper.find('button')).to.have.length(2);
  });

  it('should call the right methods', () => {
    state.account = 'PAID';
    const wrapper = shallow(<DashboardStart {...state} />);
    wrapper.find('button').at(0).simulate('click');
    expect(state.toggleAddPackages).to.have.been.called;
    wrapper.find('button').at(1).simulate('click');
    expect(state.toggleFileUpload).to.have.been.called;
  });
});
