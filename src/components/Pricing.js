'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';

export const Pricing = React.createClass({
  render: function() {
    return <div className="row pricing">
      <div className="col-xs-12" style={{ marginTop: '20px' }}>
        <h2>NPM Notifier Pricing</h2>
      </div>
    </div>;
  }
});

function mapStateToProps(state) {
  return {

  };
}

export const PricingContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Pricing);
