'use strict';

import React from 'react';

export const LoginEmail = React.createClass({
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
      <input type="text" 
        name="email" 
        placeholder="Email" 
        className="form-control" 
        value={this.state.email}
        onChange={this.handleChange} />

        <button type="button" onClick={() => this.props.login(this.state.email)} className="btn btn-lg btn-default">{this.props.signin ? "Request Sign In Code" : "Set Up"}</button>
    </div>;
  }
});
