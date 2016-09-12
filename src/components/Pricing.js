'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';

export const Pricing = React.createClass({
  render: function() {
    return <div className="row content pricing">
      <div className="col-xs-12" style={{ marginTop: '20px' }}>
        <h2>NPM Notifier Pricing</h2>
        <div className="row">
          <div className="col-xs-12 col-lg-4 offset-lg-2 option">
            <h3>Free Notifications</h3>
            <p>Track up to 5 packages.</p>
            <p>Packages checked weekly.</p>
            <p>Email notifications</p>
            <p className="price">$0</p>
            <button className="btn btn-lg btn-default">Set Up</button>
          </div>
          <div className="col-xs-12 col-lg-4 option" style={{ marginLeft: '10px' }}>
            <h3>Unlimited Notifications</h3>
            <p>Track unlimited packages.</p>
            <p>Packages checked daily.</p>
            <p>Email notifications</p>
            <p>SMS Notifications</p>
            <p>Slack Notifications</p>
            <p className="price">$24.99/year</p>
            <button className="btn btn-lg btn-default">Set Up</button>
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
