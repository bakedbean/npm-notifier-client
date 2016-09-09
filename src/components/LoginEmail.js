'use strict';

import React from 'react';
import autofill from 'react-autofill';

export const LoginEmail = autofill(React.createClass({
  getInitialState: function() {
    return {
      email: ''
    };
  },
  handleChange: function(event) {
    return this.setState({ email: event.currentTarget.value });
  },
  render: function() {
    return <form>
      <input type="text" 
        name="email" 
        placeholder="Email" 
        className="form-control" 
        value={this.state.email}
        onChange={this.handleChange} />

        <button type="button" onClick={() => this.props.login(this.state.email)} className="btn btn-lg btn-default">{this.props.signin ? "Request Sign In Code" : "Set Up"}</button>
    </form>;
  }
}));
