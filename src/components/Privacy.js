'use strict';

import React from 'react';
import {Link} from 'react-router';

export const Privacy = React.createClass({
  render: function() {
    return <div className="row content account">
      <div className="col-xs-12" style={{ marginTop: '20px' }}>
        <h2>Privacy</h2>
        <div className="row">
          <div className="col-xs-12 col-lg-4 offset-lg-4">
            <h4>NPM Notifier Privacy Policy</h4>
            <p>NPM Notifier collects your email address and tracks the NPM packages you want to monitor.</p>
            <p>NPM Notifier does not, nor will ever, share, sell or otherwise transfer this data to any entity for any reason.</p>
            <p>I, as the developer of NPM Notifier, also will not, and will never, share, sell or otherwise transfer this data to any entity for any reason.</p>
            <p>NPM Notifier uses Stripe Checkout and SSL for secure Unlimited purchases.  NPM Notifier does not store any transactional data regarding your purchases.
              Additionally Stripe does not retain credit card information beyond the immediate need of the one time purchase.</p>
            <p>NPM Notifier tracks that you paid, and when you paid, so as to remind you shortly before one year has passed in the event that you wish to renew the service.</p>
            <p>Questions, concerns?  <Link to="/contact">Contact me</Link> and I'll be happy to address any issues.</p>
          </div>
        </div>
      </div>
    </div>;
  }
});
