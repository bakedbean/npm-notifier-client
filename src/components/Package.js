'use strict';

import React from 'react';
import moment from 'moment';
import {PackageEdit} from './PackageEdit';

export const Package = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    };
  },
  toggleEdit: function() {
    this.setState({ editing: !this.state.editing });
  },
  remove: function() {
    this.props.deletePackageRequest(this.props.data.get('_id'));
  },
  render: function() {
    if (this.props.package_view.get('view') === 'grid') {
      return <div className="col-xs-12 col-sm-4 col-lg-2 package">
        {this.props.loading.get('deleting') === this.props.data.get('_id') && <div style={{ textAlign: 'center' }}>
          Deleting {this.props.data.get('_package').get('name')}
          <h2><i className="fa fa-spin fa-circle-o-notch"></i></h2>
        </div>}
        {this.props.loading.get('deleting') !== this.props.data.get('_id') && <div>
          <h5 style={{ display: 'inline' }}><a href="Javascript: void();" onClick={() => this.remove()}><i className="fa fa-times"></i></a> {!this.state.editing && <a href="Javascript: void(0);" onClick={() => this.toggleEdit()}><i className="fa fa-pencil"></i></a>}</h5>
          <p style={{ fontWeight: 'bold' }}>{this.props.data.get('_package').get('name')} {this.props.data.get('_package').get('version')}</p>
          {this.state.editing && <PackageEdit {...this.props} toggleEdit={this.toggleEdit} />}
          {!this.state.editing && <div>
            <p><strong>Checked:</strong> {moment(this.props.data.get('_package').get('checked_at')).format('MM/DD/YY h:mm a')}</p>
            <p><strong>Updated:</strong> {moment(this.props.data.get('_package').get('updated_at')).format('MM/DD/YY h:mm a')}</p>
          </div>}
        </div>}
      </div>;
    } else if (this.props.package_view.get('view') === 'list') {
      return <tr>
        <td style={{ fontSize: '1.25em' }}><a href="Javascript: void();" onClick={() => this.remove()}><i className="fa fa-times"></i></a> {!this.state.editing && <a href="Javascript: void(0);" onClick={() => this.toggleEdit()}><i className="fa fa-pencil"></i></a>} {this.state.editing && <a href="Javascript: void(0);" onClick={() => this.toggleEdit()}><i className="fa fa-check"></i></a>}</td>
        <td>{this.props.data.get('_package').get('name')}</td>
        <td>{this.props.data.get('_package').get('version')}</td>
        {!this.state.editing && <td>{moment(this.props.data.get('_package').get('checked_at')).format('MM/DD/YY h:mm a')}</td>}
        {!this.state.editing && <td>{moment(this.props.data.get('_package').get('updated_at')).format('MM/DD/YY h:mm a')}</td>}
        {this.state.editing && <td colSpan="2"><PackageEdit {...this.props} toggleEdit={this.toggleEdit} /></td>}
      </tr>
    }
  }
});
