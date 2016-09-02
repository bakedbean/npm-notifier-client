'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';


export const Login = React.createClass({
  render: function() {
    return <div className="row">
      <div className="col-xs-12 col-lg-6 login">
      </div>
      <div className="col-xs-12 col-lg-6 login text-xs-center">
        <h3>Receive update notifications,</h3> 
        <h3>simply and easily.</h3>
        <input type="text" name="email" placeholder="Email" className="form-control" />
        <button type="button" className="btn btn-lg btn-default">Sign Up</button>
      </div>
    </div>;
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
