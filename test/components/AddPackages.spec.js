import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import {fromJS, List} from 'immutable';
import {shallow} from 'enzyme';
import AddPackages from '../../src/components/AddPackages';
import {expect} from 'chai';
import Data from '../mocks/state';
import Package from '../mocks/package';

let state;

describe('<AddPackages />', () => {
  beforeEach(function() {
    state = {
      auth: Data().reducer.get('auth'),
      account: Data().reducer.get('account'),
      packages: Data().reducer.get('packages'),
      savedPackages: Data().reducer.get('savedPackages'),
      loading: Data().reducer.get('loading'),
      packageAdd: sinon.spy(),
      packagesReset: sinon.spy(),
      toggleAddPackages: sinon.spy(),
      packagesSave: sinon.spy()
    }
    
  });

  it('should add an empty package to state and show default', () => {
    state.packages = state.packages.merge(List([fromJS({ _package: { name: '' } })]));
    const wrapper = shallow(<AddPackages {...state} />);
    expect(state.packageAdd).to.have.been.called;
    expect(wrapper.find('AddPackage')).to.have.length(1);
  });

  it('should close the view if saved packages match active packages', () => {
    state.packages = state.packages.merge(List([Package()]));
    const wrapper = shallow(<AddPackages {...state} />);
    wrapper.setProps({ savedPackages: state.savedPackages.merge(List([Package()]))});
    expect(state.packagesReset).to.have.been.called;
    expect(state.toggleAddPackages).to.have.been.called;
  });

  it('should save any new packages', () => {
    state.packages = state.packages.merge(List([fromJS({ _package: { name: 'angular' } })]));
    const wrapper = shallow(<AddPackages {...state} />);
    wrapper.find('#save').simulate('click');
    expect(state.packagesSave).to.have.been.calledWith(state.packages);
  });
});
