'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';
import {AddPackages} from './AddPackages';

export const Dashboard = React.createClass({
  getInitialState: function() {
    return {
      adding: false
    };
  },
  componentWillMount: function() {
    this.props.dashboard();
  },
  toggleAddPackages: function() {
    return this.setState({ adding: !this.state.adding });
  },
  render: function() {
    return <div className="row dashboard content">
      <div className="col-xs-12" style={{ paddingTop: '110px' }}>
        <div className="dashboard-container">
          <h2>Dashboard</h2>
        </div>
        {this.state.adding && <AddPackages {...this.props} toggleAddPackages={this.toggleAddPackages} />}
        {this.props.packages.size < 1 && !this.state.adding && <div className="row content" style={{ margin: '-100px 0 0 0'}}>
          <div className="col-xs-12 text-xs-center" style={{ float: 'none', margin: 'auto' }}>
            <button className="btn btn-lg start" onClick={() => this.toggleAddPackages()} style={{ padding: '20px' }}>Add Package</button>
          </div>
        </div>}
      </div>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    auth: state.reducer.get('auth'),
    account: state.reducer.get('account'),
    packages: state.reducer.get('packages')
  };
}

export const DashboardContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Dashboard);
