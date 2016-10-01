import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import {List} from 'immutable';
import {shallow} from 'enzyme';
import {Packages} from '../../src/components/Packages';
import {expect} from 'chai';
import Data from '../mocks/state';
import Package from '../mocks/package';

let state;

describe('<Packages />', () => {
  beforeEach(function() {
    state = {
      auth: Data().reducer.get('auth'),
      account: Data().reducer.get('account'),
      packages: Data().reducer.get('packages'),
      savedPackages: Data().reducer.get('savedPackages'),
      loading: Data().reducer.get('loading'),
      package_view: Data().reducer.get('package_view'),
      sortPackages: sinon.spy()
    }
    
  });

  it('should render list view of packages', () => {
    state.packages = state.packages.merge(List([Package(), Package()]));
    const wrapper = shallow(<Packages {...state} />);
    expect(wrapper.find('Package')).to.have.length(2);
    expect(wrapper.find('th')).to.have.length(5);
  });

  it ('should render grid view of packages', () => {
    state.package_view = state.package_view.set('view', 'grid');
    state.packages = state.packages.merge(List([Package(), Package()]));
    const wrapper = shallow(<Packages {...state} />);
    expect(wrapper.find('Package')).to.have.length(2);
    expect(wrapper.find('th')).to.have.length(0);
  });
});
