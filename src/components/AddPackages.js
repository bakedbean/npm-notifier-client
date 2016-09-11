'use strict';

import React from 'react';
import request from '../utils/request';
import {fromJS} from 'immutable';
import {AddPackage} from './AddPackage';

export const AddPackages = React.createClass({
  componentWillMount: function() {
    this.props.packageAdd();
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.packages.size === nextProps.savedPackages.size && !nextProps.packages.find(p => !p.get('_package').get('isValid'))) {
      this.cancel();
    }
  },
  addMorePackages: function() {
    if (this.props.account === 'FREE' && this.props.packages.size === 5) {
      alert("5 package limit reached. Please check out pricing options for more packages.");
    } else {
      this.props.packageAdd();
    }
  },
  removePackage: function(index) {
    this.props.packageRemove(index);

    if (this.props.packages.size <= 1) {
      this.props.toggleAddPackages();
    }
  },
  cancel: function() {
    this.props.packagesReset();
    this.props.toggleAddPackages();
  },
  validate: function() {
    this.props.packagesSave(this.props.packages);
  },
  render: function() {
    return <div className="row">
      <div className="col-xs-12 col-lg-8 offset-lg-2 add-panel">
        <h3><a href="#" onClick={() => this.cancel()}><i className="fa fa-times"></i></a></h3>
        {this.props.packages.map((k, i) => {
          if (!k.get('_package').get('version')) {
            return <AddPackage 
              {...this.props} 
              key={i} 
              index={i} 
              package={k}
              removePackage={this.removePackage} />
          }
        })}

        <div className="text-xs-center text-lg-center" style={{ marginTop: '20px' }}>
          {!this.props.loading.get('packages') && <h1><a href="#" onClick={() => this.validate()}><i className="fa fa-save"></i></a> <a href="#" onClick={() => this.addMorePackages()}><i className="fa fa-plus"></i></a></h1>}
          {this.props.loading.get('packages') && <h1><a href="#"><i className="fa fa-spin fa-circle-o-notch"></i></a></h1>}
        </div>
      </div>
    </div>;
  }
});
