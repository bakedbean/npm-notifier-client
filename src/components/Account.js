'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';
import {Link} from 'react-router';
import moment from 'moment';

export const Account = React.createClass({
  render: function() {
    return <div className="row content account">
      <div className="col-xs-12" style={{ marginTop: '20px' }}>
        <h2>Account</h2>
        <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section">
            <strong>Account Type:</strong> {this.props.account === 'FREE' && "Free - track up to 5 packages"} {this.props.account === 'PAID' && "Unlimited - track as many packages as you want"}
          </div>
        </div>
        {this.props.account === 'PAID' && <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section">
            <strong>Unlimited account:</strong> created {moment(this.props.lastPaid).format('MM/DD/YYYY')} (Expires {moment(this.props.lastPaid).to(moment(this.props.lastPaid).add(365, 'days'))}) <Link to="/pricing">Renew</Link>
          </div>
        </div>}
        <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section">
            <strong>Currently tracking:</strong> {this.props.packages.size} packages
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3">
            <button className="btn btn-lg btn-block" onClick={() => window.location = '/'}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    account: state.reducer.get('account'),
    lastPaid: state.reducer.get('lastPaid'),
    packages: state.reducer.get('savedPackages')
  };
}

export const AccountContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Account);
