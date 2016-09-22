'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';
import {DashboardStart} from './DashboardStart';
import {DashboardNav} from './DashboardNav';
import {AddPackages} from './AddPackages';
import {Packages} from './Packages';

export const Dashboard = React.createClass({
  getInitialState: function() {
    return {
      view: 'list',
      adding: false,
      uploading: false,
      searching: false
    };
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.alerts.get('upload')) {
      setTimeout(() => this.props.updateAlert('upload'), 5000);
    }
  },
  toggleAddPackages: function() {
    return this.setState({ adding: !this.state.adding, uploading: false });
  },
  toggleFileUpload: function() {
    this.setState({ adding: !this.state.adding, uploading: !this.state.uploading });
  },
  toggleSearch: function() {
    this.setState({ searching: !this.state.searching });
    if (this.state.searching) this.props.packagesReset();
  },
  toggleView: function(view) {
    this.props.dashboardView(view);
  },
  render: function() {
    if (this.props.packages.size < 1 && !this.state.adding) {
      return <DashboardStart {...this.props} toggleAddPackages={this.toggleAddPackages} toggleFileUpload={this.toggleFileUpload} />;
    } else {
      return <div className="dashboard">
        <div className="row content">
          <div className="col-xs-12 dashboard-col" style={{ paddingTop: '110px' }}>
            {this.props.alerts.get('upload') && <div className="alert alert-success text-xs-center">package.json upload complete, added {this.props.packages.size} packages.</div>}
            <h3>Dashboard</h3>

            {!this.state.adding && <DashboardNav 
              {...this.props} 
              toggleAddPackages={this.toggleAddPackages} 
              toggleFileUpload={this.toggleFileUpload}
              toggleSearch={this.toggleSearch}
              toggleView={this.toggleView}
              searching={this.state.searching} />}
          </div>
        </div>

        <div className="dashboard-container">
          {!this.state.adding && 
            <Packages {...this.props} view={this.state.view} />}

          {this.state.adding && 
            <AddPackages {...this.props} toggleAddPackages={this.toggleAddPackages} uploading={this.state.uploading} />}
        </div>
      </div>;
    }
  }
});

function mapStateToProps(state) {
  return {
    auth: state.reducer.get('auth'),
    account: state.reducer.get('account'),
    alerts: state.reducer.get('alerts'),
    packages: state.reducer.get('packages'),
    savedPackages: state.reducer.get('savedPackages'),
    loading: state.reducer.get('loading'),
    package_view: state.reducer.get('package_view')
  };
}

export const DashboardContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Dashboard);
