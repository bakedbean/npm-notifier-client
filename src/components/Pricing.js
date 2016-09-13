'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';

var handler = StripeCheckout.configure({
  key: 'pk_test_oo1VGh8orwDh28RhRlPsVhcr',
  image: 'img/npm-notifier-logo.png',
  locale: 'auto',
  token: function(token) {
    console.log(token);
  }
});

export const Pricing = React.createClass({
  componentWillUnmount: function() {
    handler.close();
  },
  purchase: function(type) {
    if (type === 'free') {
      window.location = '/';
    } else {
      handler.open({
        name: 'NPM Notifier',
        description: 'Unlimited Notifications',
        amount: 2499
      });
    }
  },
  render: function() {
    return <div className="row content pricing">
      <div className="col-xs-12" style={{ marginTop: '20px' }}>
        <h2>NPM Notifier Pricing</h2>
        <div className="row">
          <div className="col-xs-12 col-lg-4 offset-lg-2 option">
            <h3>Free Notifications</h3>
            <p>Track up to 5 packages.</p>
            <p>Packages checked <strong>weekly</strong>.</p>
            <p>Email notifications</p>
            <p className="price">$0</p>
            <button onClick={() => this.purchase('free')} className="btn btn-lg btn-default">Set Up</button>
          </div>
          <div className="col-xs-12 col-lg-4 option">
            <h3>Unlimited Notifications</h3>
            <p>Track <strong>unlimited</strong> packages.</p>
            <p>Packages checked <strong>daily</strong>.</p>
            <p>Email notifications</p>
            <p>SMS Notifications</p>
            <p>Slack Notifications</p>
            <p className="price">$24.99/year</p>
            <button id="unlimited" onClick={() => this.purchase('unlimited')} className="btn btn-lg btn-default">Set Up</button>
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

export const PricingContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Pricing);
