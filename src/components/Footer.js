'use strict';

import React from 'react';

export const Footer = React.createClass({
  render: function() {
    return <div className="row hidden-sm-down" id="footer">
      <div className="col-xs-12 text-xs-center">
        <h6>Track 5 packages for free.</h6><h6>Check out pricing for more options.</h6>
        <span className="footer" style={{ fontSize: '.75em' }}><a href="">pricing</a> | <a href="">terms</a> | <a href="">privacy</a></span>
      </div>
    </div>;
  }
});
