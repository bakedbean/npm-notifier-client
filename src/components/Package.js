'use strict';

import React from 'react';
import moment from 'moment';
import {PackageEdit} from './PackageEdit';

export const Package = React.createClass({
  getInitialState: function() {
    return {
      editing: false,
      removing: false
    };
  },
  toggleEdit: function() {
    this.setState({ editing: !this.state.editing, removing: false });
  },
  toggleRemove: function() {
    this.setState({ removing: !this.state.removing, editing: false });
  },
  remove: function() {
    this.props.deletePackageRequest(this.props.data.get('_id'));
    this.toggleRemove();
  },
  render: function() {
    if (this.props.package_view.get('view') === 'grid') {
      return <div className="col-xs-12 col-sm-4 col-lg-2 package">
        
        {this.props.loading.get('deleting') === this.props.data.get('_id') && 
          <div style={{ textAlign: 'center' }}>
            Deleting {this.props.data.get('_package').get('name')}
            <h2><i className="fa fa-spin fa-circle-o-notch"></i></h2>
          </div>}
        {this.props.loading.get('deleting') !== this.props.data.get('_id') && 
          <div>
            <h5 style={{ display: 'inline' }}><a href="Javascript: void(0);" onClick={this.toggleRemove}><i className="fa fa-times"></i></a> {!this.state.editing && <a href="Javascript: void(0);" onClick={() => this.toggleEdit()}><i className="fa fa-pencil"></i></a>}</h5>
            {!this.state.removing && <p style={{ fontWeight: 'bold' }}>{this.props.data.get('_package').get('name')} {this.props.data.get('_package').get('version')}</p>}
            {this.state.editing && <PackageEdit {...this.props} toggleEdit={this.toggleEdit} />}
            {!this.state.editing && !this.state.removing &&
              <div>
                <p><strong>Checked:</strong> {moment(this.props.data.get('_package').get('checked_at')).format('MM/DD/YY h:mm a')}</p>
                <p><strong>Updated:</strong> {moment(this.props.data.get('_package').get('updated_at')).format('MM/DD/YY h:mm a')}</p>
              </div>}
          </div>}
          {this.state.removing && <div style={{ textAlign: 'center' }}>
            <p>Are you sure you want to delete {this.props.data.get('_package').get('name')}?</p>
            <p><button className="btn btn-sm package-edit" onClick={this.remove}>Yes</button> <button className="btn btn-sm package-edit" onClick={this.toggleRemove}>No</button></p>
          </div>}
        </div>;
    } else if (this.props.package_view.get('view') === 'list') {
      if (!this.state.removing && !this.state.editing) {
        return <tr className="package-row" onClick={this.toggleEdit}>
          <td>{this.props.data.get('_package').get('name')}</td>
          <td>{this.props.data.get('_package').get('version')}</td>
          <td>{moment(this.props.data.get('_package').get('checked_at')).format('MM/DD/YY h:mm a')}</td>
          <td>{moment(this.props.data.get('_package').get('updated_at')).format('MM/DD/YY h:mm a')}</td>
          <td className="hidden-md-up"><a href="Javascript: void(0);" onClick={this.toggleEdit}><i className="fa fa-chevron-right"></i></a></td>
        </tr>;
      } else if (this.state.editing) {
        return <tr>
          <td colSpan="6" style={{ textAlign: 'center' }}>
            <p>Editing {this.props.data.get('_package').get('name')}</p>
            <PackageEdit 
              {...this.props} 
              toggleEdit={this.toggleEdit} 
              toggleRemove={this.toggleRemove} />
          </td>
        </tr>;
      } else {
        return <tr>
          <td colSpan="6" style={{ textAlign: 'center' }}>
            <p>Are you sure you want to delete {this.props.data.get('_package').get('name')}?</p>
            <p><button className="btn btn-sm package-edit" onClick={this.remove}>Yes</button> <button className="btn btn-sm package-edit" onClick={this.toggleRemove}>No</button></p>
          </td>
        </tr>;
      }
    }
  }
});
