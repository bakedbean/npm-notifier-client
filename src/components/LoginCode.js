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
  render: function() {
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
  }
});
