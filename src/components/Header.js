'use strict';

import React from 'react';
import {Link} from 'react-router';

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
        <div className="hidden-sm-up pull-xs-right" style={{ fontSize: '1.5em' }}>
          <ul>
            {!this.state.isLoggedIn && <li><Link to="/signin"><i className="fa fa-sign-in"></i></Link></li>}
            {this.state.isLoggedIn && <li><a href="#" onClick={() => this.signOut()}><i className="fa fa-sign-out"></i></a></li>}
            <li><Link to="/contact"><i className="fa fa-envelope-o"></i></Link></li>
            {!this.state.isLoggedIn && <li><Link to="/pricing"><i className="fa fa-ellipsis-h"></i></Link></li>}
          </ul>
        </div>

        <h5 className="hidden-sm-up">
          <a href="/"><img src="img/logo.svg" height="50" /></a>
          &nbsp;NPM Notifier<span style={{ fontSize: '.5em' }}>(beta)</span>
        </h5>
        <h4 className="hidden-xs-down">
          <a href="/"><img src="img/logo.svg" height="50" /></a>
          &nbsp;NPM Notifier<span style={{ fontSize: '.5em' }}>(beta)</span>
        </h4>
      </div>
      
      <div className="col-lg-4 header hidden-sm-down">
        <ul>
          {!this.state.isLoggedIn && <li><Link to="/signin"><i className="fa fa-sign-in"></i> Sign In</Link></li>}
          {this.state.isLoggedIn && <li><a href="#" onClick={() => this.signOut()}><i className="fa fa-sign-out"></i> Sign Out</a></li>}
          <li><Link to="/contact">Contact</Link></li>
          {!this.props.account && <li><Link to="/pricing">Pricing</Link></li>}
          {this.props.account && <li><Link to="/account">Account</Link></li>}
        </ul>
      </div>
    </div>;
  }
});
