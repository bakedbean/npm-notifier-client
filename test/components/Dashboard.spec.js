import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import {List} from 'immutable';
import {shallow } from 'enzyme';
import {Dashboard} from '../../src/components/Dashboard';
import {expect} from 'chai';
import Data from '../mocks/state';
import Package from '../mocks/package';

let state;

describe('<Dashboard />', () => {
  beforeEach(function() {
    state = {
      auth: Data().reducer.get('auth'),
      account: Data().reducer.get('account'),
      packages: Data().reducer.get('packages'),
      savedPackages: Data().reducer.get('savedPackages'),
      loading: Data().reducer.get('loading')
    }
  });

  it('should load the default dashboard', () => {
    const wrapper = shallow(<Dashboard {...state} />);
    expect(wrapper.find('DashboardStart')).to.have.length(1);
    expect(wrapper.find('Packages')).to.have.length(0);
  });

  it('should display packages', () => {
    state.packages = state.packages.merge(List([Package()]));
    const wrapper = shallow(<Dashboard {...state} />);
    expect(wrapper.find('Packages')).to.have.length(1);
    expect(wrapper.find('DashboardStart')).to.have.length(0);
  });

  it('should allow adding new packages', () => {
    const wrapper = shallow(<Dashboard {...state} />);
    wrapper.setState({ adding: true });
    expect(wrapper.find('AddPackages')).to.have.length(1);
  });

  it('should allow adding more packages', () => {
    state.packages = state.packages.merge(List([Package()]));
    const wrapper = shallow(<Dashboard {...state} />);
    wrapper.setState({ adding: true });
    expect(wrapper.find('AddPackages')).to.have.length(1);
  });

  it('should allow searching packages', () => {
    state.packages = state.packages.merge(List([Package()]));
    const wrapper = shallow(<Dashboard {...state} />);
    wrapper.setState({ searching: true });
    expect(wrapper.find('Search')).to.have.length(1);
  });
});
