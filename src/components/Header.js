'use strict';

import React from 'react';

export const Header = React.createClass({
  render: function() {
    return <div className="row">
      <div className="col-xs-12 col-lg-8 header">
        <h4>
          <a href="/">
            <img src="img/logo.svg" height="50" />
          </a>
          &nbsp;NPM Notifier
        </h4>
      </div>
      <div className="col-lg-4 header">
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/pricing">Pricing</a></li>
        </ul>
      </div>
    </div>;
  }
});
