'use strict';

import React from 'react';

export const Header = React.createClass({
  render: function() {
    return <div className="row">
      <div className="col-xs-12 col-lg-8 header">
        <h4>
          <img src="img/logo.svg" height="50" />
          &nbsp;NPM Notifier
        </h4>
      </div>
      <div className="col-lg-4 header">
        <ul>
          <li><a href="">About</a></li>
          <li><a href="">Pricing</a></li>
        </ul>
      </div>
    </div>;
  }
});
