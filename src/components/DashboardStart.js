'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class DashboardStart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="row dashboard content start">
      {!this.props.loading.get('dashboard') && <div className="col-xs-12 col-lg-4 offset-lg-4">
        <button className="btn btn-lg btn-block" onClick={this.props.toggleAddPackages} style={{ padding: '20px' }}><i className="fa fa-plus"></i> Manually Add Packages</button>
        <button className="btn btn-lg btn-block" onClick={this.props.toggleFileUpload} style={{ padding: '20px' }}><i className="fa fa-cloud-upload"></i> Upload package.json</button>
        <Link to="/account" className="btn btn-lg btn-block" style={{ padding: '20px' }}><i className="fa fa-github"></i> Configure Github Integration</Link>
      </div>}
      {this.props.loading.get('dashboard') && <div className="col-lg-12 text-xs-center">
        <h1 style={{ fontSize: '5em' }}><i className="fa fa-spin fa-circle-o-notch"></i></h1>
      </div>}
    </div>;
  }
}

DashboardStart.propTypes = {
  loading: React.PropTypes.object,
  toggleAddPackages: React.PropTypes.func,
  toggleFileUpload: React.PropTypes.func
};
