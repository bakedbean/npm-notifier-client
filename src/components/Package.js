'use strict';

import React from 'react';

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
    this.props.deletePackageFromApi(this.props.data.get('_id'));
  },
  handleChange: function(pref) {
    this.props.updatePackage(this.props.data.get('_id'), pref);
  },
  render: function() {
    return <tr>
      <td style={{ textAlign: 'right' }}>
        <h5><a href="#" onClick={() => this.remove()}><i className="fa fa-times"></i></a> <a href="#" onClick={() => this.toggleEdit()}><i className="fa fa-pencil"></i></a></h5>
      </td>
      <td>
        {!this.state.editing && this.props.data.get('_package').get('name')}
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
      </td>
      <td>{this.props.data.get('_package').get('version')}</td>
    </tr>;
  }
});
