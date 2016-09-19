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
  toggleAddPackages: function() {
    if (this.props.account === 'FREE' && this.props.savedPackages.size >= 5) {
      alert('5 package limit reached. Please check out pricing for more options');
      return this.setState({ adding: false });
    } else {
      return this.setState({ adding: !this.state.adding, uploading: false });
    }
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
    if (this.props.packages.size < 1 && !this.state.adding && !this.props.loading.get('dashbaord')) {
      return <DashboardStart {...this.props} toggleAddPackages={this.toggleAddPackages} toggleFileUpload={this.toggleFileUpload} />;
    } else {
      return <div className="dashboard">
        <div className="row content">
          <div className="col-xs-12 dashboard-col" style={{ paddingTop: '110px' }}>
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
