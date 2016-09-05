'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';

export const Dashboard = React.createClass({
  componentWillMount: function() {
    this.props.dashboard();
  },
  componentWillReceiveProps: function() {
    this.props.dashboard();
  },
  render: function() {
    return <div className="row dashboard">
      <div className="col-xs-12">
        <div className="dashboard-container">
          <h2>Dashboard</h2>
        </div>
        <div className="row">
          <div className="col-xs-12 text-xs-center">
            {this.props.packages.size < 1 && <button className="btn btn-lg">Add Package</button>}
          </div>
        </div>
      </div>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    auth: state.reducer.get('auth'),
    packages: state.reducer.get('packages')
  };
}

export const DashboardContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Dashboard);
