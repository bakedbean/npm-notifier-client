'use strict';

import React from 'react';

export const Header = React.createClass({
  getInitialState: function() {
    return {
      isLoggedIn: false
    };
  },
  componentWillMount: function() {
    this.setState({ isLoggedIn: localStorage.getItem('token') });
  },
  componentWillReceiveProps: function() {
    this.setState({ isLoggedIn: localStorage.getItem('token') });
  },
  signOut: function() {
    localStorage.removeItem('token');
    window.location = '/';
  },
  render: function() {
    return <div className="row">
      <div className="col-xs-12 col-lg-8 header">
        <h4>
          <a href="/">
            <img src="img/logo.svg" height="50" />
          </a>
          &nbsp;NPM Notifier
        </h4>
      </div>
      <div className="col-lg-4 header hidden-sm-down">
        <ul>
          {!this.state.isLoggedIn && <li><a href="/signin"><i className="fa fa-sign-in"></i> Sign In</a></li>}
          {this.state.isLoggedIn && <li><a href="#" onClick={() => this.signOut()}><i className="fa fa-sign-out"></i> Sign Out</a></li>}
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/pricing">Pricing</a></li>
        </ul>
      </div>
    </div>;
  }
});
