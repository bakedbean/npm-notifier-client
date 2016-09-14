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
          {this.props.account !== 'PAID' && <div className="col-xs-12 col-lg-4 offset-lg-2 option">
            <h3>Free Notifications</h3>
            <p>Track up to 5 packages.</p>
            <p>Packages checked <strong>weekly</strong>.</p>
            <p>Email notifications</p>
            <p>&nbsp;</p>
            <p className="price">$0</p>
            <button onClick={() => this.purchase('free')} className="btn btn-lg btn-default">Set Up</button>
          </div>}
          <div className={classNames('col-xs-12', 'col-lg-4', 'option', { 'offset-lg-4': this.props.account === 'PAID' })}>
            <h3>Unlimited Notifications</h3>
            <p>Track <strong>unlimited</strong> packages.</p>
            <p>Packages checked <strong>daily</strong>.</p>
            <p>Email notifications</p>
            <p>Slack Notifications</p>
            <p className="price">$24.99/year</p>
            <button id="unlimited" onClick={() => this.purchase('unlimited')} className="btn btn-lg btn-default">Set Up</button>
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
  console.log(ownProps);
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
