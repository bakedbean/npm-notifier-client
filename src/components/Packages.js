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
      return <div className="row">
        {packages}
      </div>;
    } else if (this.props.package_view.get('view') === 'list') {
      return <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Version</th>
            <th>Checked</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {packages}
        </tbody>
      </table>;
    }
  }
});
