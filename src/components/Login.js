'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';
import {LoginEmail} from './LoginEmail';
import {LoginCode} from './LoginCode';

export const Login = React.createClass({
  render: function() {
    return <div className="row content">
      <div className="col-xs-12 login text-xs-center">
        <div className="row" style={{ height: '100%' }}>
          <div className="col-xs-12 col-lg-7" style={{ float: 'none', margin: 'auto' }}>
            {!this.props.auth.get('email') && <h3>NPM package version change notifications, simple and easy.</h3>}
            {!this.props.auth.get('email') && <LoginEmail {...this.props} />}
            {this.props.auth.get('email') && <LoginCode {...this.props} />}
          </div>
        </div>
      </div>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    auth: state.reducer.get('auth')
  };
}

export const LoginContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Login);
