'use strict';

import React from 'react';

export default class PackageEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = pref => {
    this.props.updatePackage(this.props.data.get('_id'), pref);
  }

  render() {
    return <div className="row">
      <div className="col-xs-4">
        <input type="checkbox"
          value="active"
          checked={!this.props.data.get('active')}
          onChange={this.handleChange.bind(this, 'active')} /> Disable
      </div>
      <div className="col-xs-4">
        <input type="checkbox"
          value="email"
          checked={this.props.data.get('email')}
          onChange={this.handleChange.bind(this, 'email')} /> Email
      </div>
      {this.props.account === 'PAID' && <div className="col-xs-4">
        <input type="checkbox"
          value="slack" 
          checked={this.props.data.get('slack')}
          onChange={this.handleChange.bind(this, 'slack')} /> Slack
      </div>}
      <div className="col-xs-12 text-xs-center" style={{ padding: '10px 0 0 0' }}>
        <button className="btn btn-sm package-edit" onClick={this.props.toggleEdit}>Done</button> <button className="btn btn-sm package-edit" onClick={this.props.toggleRemove} style={{ backgroundColor: 'red', color: '#FFFFFF' }}>Delete</button>
      </div>
    </div>;
  }
}

PackageEdit.propTypes = {
  updatePackage: React.PropTypes.func,
  toggleEdit: React.PropTypes.func,
  toggleRemove: React.PropTypes.func,
  data: React.PropTypes.object
};
