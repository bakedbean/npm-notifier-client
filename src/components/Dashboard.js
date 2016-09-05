'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';

export const Dashboard = React.createClass({
  render: function() {
    return <div>
      <h1>Dashboard</h1>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    auth: state.reducer.get('auth')
  };
}

export const DashboardContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Dashboard);
