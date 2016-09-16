'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import {fromJS, List} from 'immutable';
import {shallow} from 'enzyme';
import {AddPackage} from '../../src/components/AddPackage';
import {expect} from 'chai';
import Data from '../mocks/state';
import Package from '../mocks/package';

let state;

describe('<AddPackage />', () => {
  beforeEach(function() {
    state = {
      auth: Data().reducer.get('auth'),
      account: Data().reducer.get('account'),
      packages: Data().reducer.get('packages'),
      savedPackages: Data().reducer.get('savedPackages'),
      loading: Data().reducer.get('loading'),
      removePackage: sinon.spy(),
      packageUpdate: sinon.spy(),
      package: fromJS({ _package: { name: 'react', isValid: false } })
    }
    
  });

  it('should error on an invalid package', () => {
    const wrapper = shallow(<AddPackage {...state} />);
    expect(wrapper.find('.alert')).to.have.length(1);
  });

  it('should detect duplicates', () => {
    state.package = state.package.setIn(['_package', 'isValid'], true);
    state.savedPackages = state.savedPackages.push(state.package);

    const wrapper = shallow(<AddPackage {...state} />);
    wrapper.find('input').simulate('change', {target: {value: 'react'}});
    expect(wrapper.find('.alert')).to.have.length(1);
  });

  it('should remove the package', () => {
    const wrapper = shallow(<AddPackage {...state} />);
    wrapper.find('#remove').simulate('click');
    expect(state.removePackage).to.have.been.called;
  });
});
