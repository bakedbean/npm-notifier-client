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

    return <div className="row">
      {packages}
    </div>;
  }
});
