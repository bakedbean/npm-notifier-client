'use strict';

import React from 'react';
import request from '../utils/request';
import {fromJS} from 'immutable';
import {AddPackage} from './AddPackage';
import {UploadPackages} from './UploadPackages';

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
    this.props.packageAdd();
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
    return <div className="add-panel">
        <h3><a href="#" onClick={() => this.cancel()}><i className="fa fa-times"></i></a></h3>
        {this.props.uploading && <UploadPackages {...this.props} />}
        {!this.props.uploading && this.props.packages.map((k, i) => {
          if (!k.get('_package').get('version')) {
            return <AddPackage 
              {...this.props} 
              key={i} 
              index={i} 
              package={k}
              removePackage={this.removePackage} />
          }
        })}

        {!this.props.uploading && <div className="text-xs-center text-lg-center" style={{ marginTop: '20px' }}>
          {!this.props.loading.get('packages') && <h1><a href="#" id="save" onClick={() => this.validate()}><i className="fa fa-save"></i></a> <a href="#" onClick={() => this.addMorePackages()}><i className="fa fa-plus"></i></a></h1>}
          {this.props.loading.get('packages') && <h1><a href="#"><i className="fa fa-spin fa-circle-o-notch"></i></a></h1>}
        </div>}
        {this.props.uploading && !this.props.loading.get('upload') && <div className="text-xs-center text-lg-center" style={{ marginTop: '20px' }}>
          Choosing a file will automatically start the upload.<br/>Depending on the number of packages in your dev and production dependencies, this could take a few minutes.
        </div>}
      </div>;
  }
});
