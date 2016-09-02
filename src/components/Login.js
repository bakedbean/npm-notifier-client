'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';


export const Login = React.createClass({
  render: function() {
    return <div>Hello World</div>;
  }
});

function mapStateToProps(state) {
  return {

  };
}

export const LoginContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Login);
