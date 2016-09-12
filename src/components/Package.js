'use strict';

import React from 'react';
import moment from 'moment';

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
  handleChange: function(pref) {
    this.props.updatePackage(this.props.data.get('_id'), pref);
  },
  render: function() {
    return <div className="col-xs-12 col-sm-4 col-lg-2 package">
      {this.props.loading.get('deleting') === this.props.data.get('_id') && <div style={{ textAlign: 'center' }}>
        Deleting {this.props.data.get('_package').get('name')}
        <h2><i className="fa fa-spin fa-circle-o-notch"></i></h2>
      </div>}
      {this.props.loading.get('deleting') !== this.props.data.get('_id') && <div>
          <h5 style={{ display: 'inline' }}><a href="#" onClick={() => this.remove()}><i className="fa fa-times"></i></a> <a href="#" onClick={() => this.toggleEdit()}><i className="fa fa-pencil"></i></a></h5>
          <p style={{ fontWeight: 'bold' }}>{!this.state.editing && this.props.data.get('_package').get('name')} {this.props.data.get('_package').get('version')}</p>
          {this.state.editing && <div className="row">
            <div className="col-xs-4">
              <input type="checkbox"
                value="active"
                checked={!this.props.data.get('active')}
                onChange={this.handleChange.bind(this, 'active')} /> Disable {this.props.data.get('_package').get('name')}
            </div>
            <div className="col-xs-4">
              <input type="checkbox"
                value="email"
                checked={this.props.data.get('email')}
                onChange={this.handleChange.bind(this, 'email')} /> Email
            </div>
            <div className="col-xs-4">
              <input type="checkbox"
                value="sms" 
                checked={this.props.data.get('sms')}
                onChange={this.handleChange.bind(this, 'sms')} /> SMS
            </div>
          </div>}
          <p><strong>Checked:</strong> {moment(this.props.data.get('_package').get('checked_at')).format('MM/DD/YY h:mm a')}</p>
          <p><strong>Updated:</strong> {moment(this.props.data.get('_package').get('updated_at')).format('MM/DD/YY h:mm a')}</p>
        </div>}
      </div>;
  }
});
