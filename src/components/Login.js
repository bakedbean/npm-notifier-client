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
              {!this.props.code && <h3>NPM package version change notifications, simple and easy.</h3>}

              {!this.props.code && <input type="text" 
                name="email" 
                placeholder="Email" 
                className="form-control" 
                value={this.state.email}
                onChange={this.handleChange} />}

              {!this.props.code && <button type="button" onClick={() => this.props.login(this.state.email)} className="btn btn-lg btn-default">Set Up</button>}

              {this.props.code && <h3>Please enter validation code below:</h3>}

              {this.props.code && <input type="text" 
                name="code" 
                placeholder="Code" 
                className="form-control" 
                value={this.state.code}
                onChange={this.handleChange} />}

              {this.props.code && <button type="button" onClick={() => this.props.validate(this.state.code)} className="btn btn-lg btn-default">Login</button>}
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    code: state.reducer.get('code')
  };
}

export const LoginContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Login);
