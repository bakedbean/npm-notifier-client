'use strict';

import React from 'react';
import Package from './Package';

export default class Packages extends React.Component {
  constructor(props) {
    super(props);
  }

  sort(field) {
    this.props.sortPackages(field);
  }

  render() {
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
            <th onClick={() => this.sort('name')} style={{ cursor: 'pointer' }}>Name</th>
            <th onClick={() => this.sort('version')} style={{ cursor: 'pointer' }}>Version</th>
            <th onClick={() => this.sort('checked_at')} style={{ cursor: 'pointer' }}>Checked</th>
            <th onClick={() => this.sort('updated_at')} style={{ cursor: 'pointer' }}>Updated</th>
            <th className="hidden-md-up"></th>
          </tr>
        </thead>
        <tbody>
          {packages}
        </tbody>
      </table>;
    }
  }
}

Packages.propTypes = {
  sortPackages: React.PropTypes.func,
  packages: React.PropTypes.object,
  package_view: React.PropTypes.object
};
