'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';


export const Login = React.createClass({
  render: function() {
    return <div>
      <div className="row">
        <div className="col-xs-12 login text-xs-center">
          <div className="row">
            <div className="col-xs-12 col-lg-3" style={{ float: 'none', margin: 'auto' }}>
              <h3>NPM package notifications, simple and easy.</h3>
              <input type="text" name="email" placeholder="Email" className="form-control" />
              <button type="button" className="btn btn-lg btn-default">Set Up</button>
            </div>
          </div>
        </div>
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
