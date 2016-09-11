'use strict';

import React from 'react';
import classnames from 'classnames';

export const AddPackage = React.createClass({
  getInitialState: function() {
    return {
      dupe: false
    };
  },
  handleChange: function(event) {
    let duplicate = this.props.savedPackages.find(p => p.get('_package').get('name') === event.target.value);
    if (duplicate) {
      this.setState({ dupe: true });
    } else {
      this.setState({ dupe: false });
    }
    this.props.packageUpdate(this.props.index, event.target.value);
  },
  render: function() {
    return <div className="row">
      <div className="col-xs-12 col-lg-6 offset-lg-3" style={{ padding: '10px 0 0 0' }}>
        <table style={{ width: '95%' }}> 
          <tbody>
            <tr>
              <td style={{ textAlign: 'right', verticalAlign: 'top' }}><h3 style={{ display: 'inline' }}><a href="#" onClick={() => this.props.removePackage(this.props.index)}><i className="fa fa-times"></i></a></h3></td>
              <td>
                <div className={classnames({ 'has-danger': !this.props.package.get('_package').get('isValid')})}>
                <input type="text" 
                    name="package" 
                    value={this.props.package.get('_package').get('name')}
                    placeholder="Enter package name" 
                    className="form-control"
                    onChange={this.handleChange} />
                </div>
                {!this.props.package.get('_package').get('isValid') && <div className="alert alert-danger">This does not appear to be a valid package.</div>}
                {this.state.dupe && <div className="alert alert-danger">This package is already being tracked</div>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>;
  }
});
