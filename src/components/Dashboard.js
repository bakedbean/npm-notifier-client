'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';
import classNames from 'classnames';
import {DashboardStart} from './DashboardStart';
import {AddPackages} from './AddPackages';
import {Packages} from './Packages';
import {Search} from './Search';

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
      return <div className="row dashboard content">
        <div className="col-xs-12" style={{ paddingTop: '110px' }}>
          {(this.props.packages.size > 0 || 
            this.state.adding) && 
            <div className="dashboard-container">

              {!this.state.adding && 
                <h2>Dashboard 
                  <ul className="hidden-xs-down">
                    <li><a href="Javascript: void(0);" onClick={() => this.toggleView(this.props.package_view.get('view') === 'list' ? 'grid' : 'list')}><i className={classNames('fa', { 'fa-th-list': this.props.package_view.get('view') === 'grid', 'fa-th-large': this.props.package_view.get('view') === 'list' })}></i></a></li>
                    {this.props.account === 'PAID' && <li><a href="#" onClick={() => this.toggleFileUpload()}><i className="fa fa-cloud-upload"></i></a></li>}
                    <li><a href="#" onClick={() => this.toggleAddPackages()}><i className="fa fa-plus"></i></a></li>
                    <li><a href="#" onClick={() => this.toggleSearch()}><i className="fa fa-search"></i></a></li>
                    {this.state.searching && <li><Search {...this.props} /></li>}
                    <li className="hidden-xs-down" style={{ fontSize: '.5em' }}>Tracking <strong>{this.props.packages.size}</strong> packages</li>
                  </ul>
                </h2>}

              {!this.state.adding && <ul className="hidden-sm-up">
                <li><a href="Javascript: void(0);" onClick={() => this.toggleView(this.props.package_view.get('view') === 'list' ? 'grid' : 'list')}><i className={classNames('fa', { 'fa-th-list': this.props.package_view.get('view') === 'grid', 'fa-th-large': this.props.package_view.get('view') === 'list' })}></i></a></li>
                {this.props.account === 'PAID' && <li><a href="#" onClick={() => this.toggleFileUpload()}><i className="fa fa-cloud-upload"></i></a></li>}
                <li><a href="#" onClick={() => this.toggleAddPackages()}><i className="fa fa-plus"></i></a></li>
                <li><a href="#" onClick={() => this.toggleSearch()}><i className="fa fa-search"></i></a></li>
                {this.state.searching && <li><Search {...this.props} /></li>}
                <li className="hidden-xs-down" style={{ fontSize: '.5em' }}>Tracking <strong>{this.props.packages.size}</strong> packages</li>
              </ul>}

              {!this.state.adding && 
                <Packages {...this.props} view={this.state.view} />}

              {this.state.adding && 
                <AddPackages {...this.props} toggleAddPackages={this.toggleAddPackages} uploading={this.state.uploading} />}
            </div>}
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
