'use strict';

import React from 'react';
import classNames from 'classnames';
import Search from './Search';

export default class DashboardNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return <div>
        <ul className="hidden-xs-down">
          <li><a href="Javascript: void(0);" onClick={() => this.props.toggleView(this.props.package_view.get('view') === 'list' ? 'grid' : 'list')}><i className={classNames('fa', { 'fa-th-list': this.props.package_view.get('view') === 'grid', 'fa-th-large': this.props.package_view.get('view') === 'list' })}></i></a></li>
          <li><a href="#" onClick={this.props.toggleFileUpload}><i className="fa fa-cloud-upload"></i></a></li>
          <li><a href="#" onClick={this.props.toggleAddPackages}><i className="fa fa-plus"></i></a></li>
          <li><a href="#" onClick={this.props.toggleSearch}><i className="fa fa-search"></i></a></li>
          {this.props.searching && <li><Search {...this.props} /></li>}
          <li className="hidden-xs-down" style={{ fontSize: '.5em' }}>Tracking <strong>{this.props.packages.size}</strong> packages</li>
        </ul>

        <ul className="hidden-sm-up">
          <li><a href="Javascript: void(0);" onClick={() => this.props.toggleView(this.props.package_view.get('view') === 'list' ? 'grid' : 'list')}><i className={classNames('fa', { 'fa-th-list': this.props.package_view.get('view') === 'grid', 'fa-th-large': this.props.package_view.get('view') === 'list' })}></i></a></li>
          <li><a href="#" onClick={this.props.toggleFileUpload}><i className="fa fa-cloud-upload"></i></a></li>
          <li><a href="#" onClick={this.props.toggleAddPackages}><i className="fa fa-plus"></i></a></li>
          <li><a href="#" onClick={this.props.toggleSearch}><i className="fa fa-search"></i></a></li>
          {this.props.searching && <li><Search {...this.props} /></li>}
        </ul>
      </div>;
  }
}

DashboardNav.propTypes = {
  toggleView: React.PropTypes.func,
  toggleFileUpload: React.PropTypes.func,
  toggleSearch: React.PropTypes.func,
  toggleAddPackages: React.PropTypes.func,
  packages: React.PropTypes.object,
  searching: React.PropTypes.bool
};
