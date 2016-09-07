'use strict';

import React from 'react';
import request from '../utils/request';
import {fromJS} from 'immutable';
import {AddPackage} from './AddPackage';

export const AddPackages = React.createClass({
  componentWillMount: function() {
    if (this.props.packages.size < 1) {
      this.props.packageAdd();
    }
  },
  addMorePackages: function() {
    if (this.props.account === 'FREE' && this.props.packages.size === 5) {
      alert("Please check out pricing options for more packages.");
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
    console.log(this.props.packages.toJS());
  },
  render: function() {
    return <div className="add-panel">
      <h3><a href="#" onClick={() => this.cancel()}><i className="fa fa-times"></i></a></h3>
      {this.props.packages.map((k, i) => {
        return <AddPackage 
          {...this.props} 
          key={i} 
          index={i} 
          name={k}
          removePackage={this.removePackage} />
      })}
      <div className="row">
        <div className="col-xs-12 col-lg-6 offset-lg-3 text-xs-center" style={{ padding: '20px 0 0 0' }}>
          <h1><a href="#" onClick={() => this.validate()}><i className="fa fa-save"></i></a> <a href="#" onClick={() => this.addMorePackages()}><i className="fa fa-plus"></i></a></h1>
        </div>
      </div>
    </div>;
  }
});
