'use strict';

import React from 'react';

export const Package = React.createClass({
  remove: function() {
    this.props.deletePackageFromApi(this.props.data.get('_id'));
  },
  render: function() {
    return <tr>
      <td style={{ textAlign: 'right' }}>
        <h5><a href="#" onClick={() => this.remove()}><i className="fa fa-times"></i></a> <a href="#"><i className="fa fa-pencil"></i></a></h5>
      </td>
      <td>{this.props.data.get('_package').get('name')}</td>
      <td>{this.props.data.get('_package').get('version')}</td>
    </tr>;
  }
});
