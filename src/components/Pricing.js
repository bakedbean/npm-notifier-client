'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';
import {Link} from 'react-router';
import classNames from 'classnames';

export const Pricing = React.createClass({
  componentWillMount: function() {
    this.handler = StripeCheckout.configure({
      key: 'pk_live_wwU0CJij8yw3hoIP6i90YtB0',
      image: 'img/npm-notifier-logo.png',
      locale: 'auto',
      token: token => this.props.purchaseUnlimited(token)
    });
  },
  componentWillUnmount: function() {
    this.handler.close();
  },
  componentDidUpdate: function() {
    if (this.props.auth) {
      this.props.history.push('/login');
    }
  },
  purchase: function(type) {
    if (type === 'free') {
      window.location = '/';
    } else {
      this.handler.open({
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
          <div className={classNames('col-xs-12', 'col-lg-6', 'offset-lg-3', 'option', { 'offset-lg-4': this.props.account === 'PAID' })}>
            <h3 className="price">NPM Version Change Notifications</h3>
            <p>Take control of NPM package churn.  Get notified when packages are updated.</p>
            
            <p className="price">$24.99/year</p>
            <button id="unlimited" className="btn btn-lg btn-default" onClick={() => window.location = '/'}>30 Day Trial</button> <button id="unlimited" onClick={() => this.purchase('unlimited')} className="btn btn-lg btn-default">Set Up</button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-lg-8 offset-lg-2 option text-xs-left">
            <h3>Features</h3>
            <hr/>
            <h5 className="price">Github Integration</h5>
            <p>Connect NPM Notifier to your github account and monitor multiple repository package.json updates. Repos are checked daily prior to notification digests being sent, so you can set it and forget it.</p>
            <h5 className="price">Upload package.json</h5>
            <p>Don't want to use Github? Manually upload multiple package.json files.</p>
            <h5 className="price">Email Notifications</h5>
            <p>Receive a daily digest of changes to the packages you're tracking.</p>
            <h5 className="price">Slack Notifications</h5>
            <p>Configure a Slack web hook to receive daily digests to the Slack channel of your choice.</p>
            <h5 className="price">Full Control</h5>
            <p>Control notifications globally, or per package.</p>
            <h5 className="price">30 Day Trial</h5>
            <p>Try it out, after 30 days you'll simply stop receiving notifications, but we'll hang on to your account and configuration for an additional 60 days.  If you decide to pay for the year of unlimited notifications, then you'll start receiving notifications again!</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </div>
        </div>
        <div className="row hidden-sm-up" style={{ margin: '10px 0 10px 0' }}>
          <div className="col-xs-12 text-xs-center">
            <Link to="/terms">Terms of Service</Link> | <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>;
  }
});

function mapStateToProps(state, ownProps) {
  return {
    auth: state.reducer.get('auth'),
    account: state.reducer.get('account'),
    history: ownProps.history
  };
}

export const PricingContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Pricing);
