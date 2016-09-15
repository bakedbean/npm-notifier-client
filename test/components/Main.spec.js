import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {Main} from '../../src/components/Main';
import {expect} from 'chai';

let path = {
  pathname: 'login'
};

describe('<Main />', () => {
  it('should load the header and footer', () => {
    const callback = sinon.spy();
    const wrapper = shallow(<Main location={path} dashboard={callback} />);
    expect(wrapper.find('Header')).to.have.length(1);
    expect(wrapper.find('Footer')).to.have.length(1);
  });

  it('should load the dashboard state', () => {
    const callback = sinon.spy();
    const wrapper = shallow(<Main location={path} dashboard={callback} />);
    expect(callback).to.have.been.called;
  });
});
