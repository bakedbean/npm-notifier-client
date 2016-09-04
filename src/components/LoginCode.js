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
  render: function() {
    return <div>
      <h3>Please enter validation code below:</h3>

      <input type="text" 
        name="code" 
        placeholder="Code" 
        className="form-control" 
        value={this.state.code}
        onChange={this.handleChange} />

      <button type="button" onClick={() => this.props.validate(this.props.auth.get('email'), this.state.code)} className="btn btn-lg btn-default">Login</button>
    </div>;
  }
});
