'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import {fromJS, List} from 'immutable';
import {shallow} from 'enzyme';
import {DashboardNav} from '../../src/components/DashboardNav';
import {expect} from 'chai';
import Data from '../mocks/state';
import Package from '../mocks/package';

let state;

describe('<DashboardNav />', () => {
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
      package_view: Data().reducer.get('package_view'),
      toggleAddPackages: sinon.spy(),
      toggleFileUpload: sinon.spy(),
      toggleView: sinon.spy(),
      searching: true
    }
  });

  it('should set the view to grid', () => {
    const wrapper = shallow(<DashboardNav {...state} />);
    wrapper.find('li').at(0).childAt(0).simulate('click');
    expect(state.toggleView).to.have.been.calledWith('grid');
  });

  it('should set the view to list', () => {
    state.package_view = state.package_view.set('view', 'grid');
    const wrapper = shallow(<DashboardNav {...state} />);
    wrapper.find('li').at(0).childAt(0).simulate('click');
    expect(state.toggleView).to.have.been.calledWith('list');
  });

  it('should toggle file upload', () => {
    state.account = 'PAID';
    const wrapper = shallow(<DashboardNav {...state} />);
    wrapper.find('li').at(1).childAt(0).simulate('click');
    expect(state.toggleFileUpload).to.have.been.called;
  });

  it('should toggle add packages', () => {
    state.account = 'PAID';
    const wrapper = shallow(<DashboardNav {...state} />);
    wrapper.find('li').at(2).childAt(0).simulate('click');
    expect(state.toggleAddPackages).to.have.been.called;
  });

  it('should show search field', () => {
    state.account = 'PAID';
    const wrapper = shallow(<DashboardNav {...state} />);
    expect(wrapper.find('Search')).to.have.length(2);
  });
});
