'use strict';

import React from 'react';
import {Link} from 'react-router';

export default class Privacy extends React.Component {
  render() {
    return <div className="row content account">
      <div className="col-xs-12 col-lg-6 offset-lg-3" style={{ marginTop: '20px' }}>
        <h2>NPM Notifier Privacy Policy</h2>
        <p>NPM Notifier collects your email address and tracks the NPM packages you want to monitor.</p>
        <p>NPM Notifier does not, nor will ever, share, sell or otherwise transfer this data to any entity for any reason.</p>
        <p>NPM Notifier uses Stripe Checkout and SSL for secure purchases.  NPM Notifier does not store any transactional data regarding your purchases.
          Additionally Stripe does not retain credit card information beyond the immediate need of the one time purchase.</p>
        <p>NPM Notifier tracks that you paid, and when you paid, so as to remind you shortly before one year has passed in the event that you wish to renew the service.</p>
        <p>Questions, concerns?  <Link to="/contact">Contact me</Link> and I'll be happy to address any issues.</p>
      </div>
    </div>;
  }
}
