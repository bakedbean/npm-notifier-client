'use strict';

import React from 'react';
import {Package} from './Package';

export const Packages = React.createClass({
  render: function() {
    let packages = this.props.packages.map((k,i) => {
      if (k.get('_package').get('version')) {
        return <Package {...this.props} data={k} key={i} />;
      }
    });

    if (this.props.package_view.get('view') === 'grid') {
      return <div className="row content" style={{ paddingTop: '110px' }}>
        {packages}
      </div>;
    } else if (this.props.package_view.get('view') === 'list') {
      return <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Version</th>
            <th>Checked</th>
            <th>Updated</th>
            <th className="hidden-md-up"></th>
          </tr>
        </thead>
        <tbody>
          {packages}
        </tbody>
      </table>;
    }
  }
});
