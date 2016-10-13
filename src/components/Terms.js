'use strict';

import React from 'react';

export default class Terms extends React.Component {
  render() {
    return <div className="row content account">
      <div className="col-xs-12" style={{ marginTop: '20px' }}>
        <h2>Terms</h2>
        <div className="row">
          <div className="col-xs-12 col-lg-4 offset-lg-4">
            <h4>NPM Notifier Terms of Service</h4>
            <strong>Refunds</strong>
            <p>NPM Notifier offers a single, one time purchase to upgrade to unlimited notifications.</p>
            <p>Unlimited purchases may be refunded up to 30 days from the date of purchase.</p>
            <strong>Availability</strong>
            <p>NPM Notifier is a simple service that relies on certain assumptions about how NPM package data is provided upstream.</p>
            <p>There is always the possibility that this upstream data becomes unreliable, unavailable, or removed entirely.</p>
            <p>In the event that NPM Notifier is unable to provide notifications for more than 60 days, NPM Notifier will refund 100% of the purchase price, if the purchase was made within six (6) months of the outage.</p>
            <p>Purchases made more than six (6) months from a sustained outage as described above are non-refundable.</p>
            <p>NPM Notifier reserves the right to remove any user from the service if use of the service is deemed innappropriate.</p>
          </div>
        </div>
      </div>
    </div>;
  }
};
