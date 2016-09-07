'use strict';

import React from 'react';

export const AddPackage = React.createClass({
  handleChange: function(event) {
    this.props.packageUpdate(this.props.index, event.target.value);
  },
  render: function() {
    return <div className="row">
      <div className="col-xs-12 col-lg-6 offset-lg-3" style={{ padding: '10px 0 0 0' }}>
        <table style={{ width: '95%' }}> 
          <tbody>
            <tr>
              <td style={{ textAlign: 'right' }}><h3 style={{ display: 'inline' }}><a href="#" onClick={() => this.props.removePackage(this.props.index)}><i className="fa fa-times"></i></a></h3></td>
              <td><input type="text" 
                    name="package" 
                    value={this.props.name}
                    placeholder="Enter package name" 
                    className="form-control"
                    onChange={this.handleChange} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>;
  }
});
