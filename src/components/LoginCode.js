'use strict';

import React from 'react';

export const LoginCode = React.createClass({
  getInitialState: function() {
    return {
      code: ''
    };
  },
  handleChange: function(event) {
    return this.setState({ code: event.target.value });
  },
  handleKeypress: function(event) {
    if (event.key === 'Enter') {
      this.props.validate(this.props.auth.get('email'), this.state.code);
    }
  },
  reset: function() {
    window.location = '/';
  },
  render: function() {
    if (!this.props.alerts.get('login')) {
      return <div>
        <h3>A login code has been sent to the email you provided.</h3>
        <h3>Please enter it below to continue.</h3>

        <input type="text" 
          name="code" 
          placeholder="Code" 
          className="form-control" 
          value={this.state.code}
          onKeyPress={this.handleKeypress}
          onChange={this.handleChange} />

        <button type="button" onClick={() => this.props.validate(this.props.auth.get('email'), this.state.code)} className="btn btn-lg btn-default">Login</button>
      </div>;
    } else {
      return <div>
        <h3>The login code has expired.</h3><h3>Enter your email again to send a new one.</h3>

        <button type="button" onClick={() => this.reset()} className="btn btn-lg btn-default">Back</button>
      </div>;
    }
  }
});
