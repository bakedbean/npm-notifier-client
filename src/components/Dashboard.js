'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';
import DashboardStart from './DashboardStart';
import DashboardNav from './DashboardNav';
import AddPackages from './AddPackages';
import Packages from './Packages';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'list',
      adding: false,
      uploading: false,
      searching: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alerts.get('upload')) {
      setTimeout(() => this.props.updateAlert('upload'), 5000);
    }
  }

  toggleAddPackages = () => {
    return this.setState({ adding: !this.state.adding, uploading: false });
  }

  toggleFileUpload = () => {
    this.setState({ adding: !this.state.adding, uploading: !this.state.uploading });
  }

  toggleSearch = () => {
    this.setState({ searching: !this.state.searching });
    if (this.state.searching) this.props.packagesReset();
  }

  toggleView = view => {
    this.props.dashboardView(view);
  }

  render() {
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
}

Dashboard.propTypes = {
  auth: React.PropTypes.object,
  account: React.PropTypes.string,
  alerts: React.PropTypes.object,
  packages: React.PropTypes.object,
  savedPackages: React.PropTypes.object,
  loading: React.PropTypes.object,
  package_view: React.PropTypes.object
};

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
