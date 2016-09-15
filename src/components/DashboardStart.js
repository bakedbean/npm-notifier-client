'use strict';

import React from 'react';

export const DashboardStart = React.createClass({
  render: function() {
    return <div className="row dashboard content start">
      <div className="col-xs-12 col-lg-4 offset-lg-4">
        <button className="btn btn-lg btn-block" onClick={() => this.props.toggleAddPackages()} style={{ padding: '20px' }}>Manually Add Packages</button>
        {this.props.account === 'PAID' && <button className="btn btn-lg btn-block" onClick={() => this.props.toggleFileUpload()} style={{ padding: '20px' }}>Upload package.json</button>}
      </div>
    </div>;
  }
});
