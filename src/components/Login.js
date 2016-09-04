'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';


export const Login = React.createClass({
  getInitialState: function() {
    return {
      email: ''
    };
  },
  handleChange: function(event) {
    return this.setState({ email: event.target.value });
  },
  render: function() {
    return <div>
      <div className="row">
        <div className="col-xs-12 login text-xs-center">
          <div className="row">
            <div className="col-xs-12 col-lg-4" style={{ float: 'none', margin: 'auto' }}>
              <h3>NPM package version change notifications, simple and easy.</h3>

              <input type="text" 
                name="email" 
                placeholder="Email" 
                className="form-control" 
                value={this.state.email}
                onChange={this.handleChange} />

              <button type="button" onClick={() => this.props.login(this.state.email)} className="btn btn-lg btn-default">Set Up</button>
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
