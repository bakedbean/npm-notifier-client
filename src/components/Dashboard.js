'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';
import {AddPackages} from './AddPackages';
import {Packages} from './Packages';
import {Search} from './Search';

export const Dashboard = React.createClass({
  getInitialState: function() {
    return {
      adding: false,
      searching: false
    };
  },
  componentWillMount: function() {
    this.props.dashboard();
  },
  toggleAddPackages: function() {
    if (this.props.account === 'FREE' && this.props.savedPackages.size >= 5) {
      alert('5 package limit reached. Please check out pricing for more options');
      return this.setState({ adding: false });
    } else {
      return this.setState({ adding: !this.state.adding });
    }
  },
  toggleSearch: function() {
    this.setState({ searching: !this.state.searching });
    if (this.state.searching) this.props.packagesReset();
  },
  render: function() {
    return <div className="row dashboard content">
      <div className="col-xs-12" style={{ paddingTop: '110px' }}>
        <div className="dashboard-container">
          <h2>Dashboard <a href="#" onClick={() => this.toggleAddPackages()}><i className="fa fa-plus"></i></a> <a href="#" onClick={() => this.toggleSearch()}><i className="fa fa-search"></i></a> {this.state.searching && <Search {...this.props} />}</h2>
          {this.props.packages.size > 0 && !this.state.adding && <Packages {...this.props} />}
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
    packages: state.reducer.get('packages'),
    savedPackages: state.reducer.get('savedPackages'),
    loading: state.reducer.get('loading')
  };
}

export const DashboardContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Dashboard);
