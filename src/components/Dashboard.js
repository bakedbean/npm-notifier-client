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
    return <div className="row dashboard content">
      <div className="col-xs-12">
        <div className="dashboard-container">
          <h2>Dashboard</h2>
        </div>
        {this.props.packages.size < 1 && <div className="row content" style={{ margin: '-50px 0 0 0'}}>
          <div className="col-xs-12 text-xs-center" style={{ float: 'none', margin: 'auto' }}>
            <button className="btn btn-lg start" style={{ padding: '20px' }}>Add Package</button>
          </div>
        </div>}
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
