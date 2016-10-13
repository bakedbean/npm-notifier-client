'use strict';

import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <footer className="row hidden-sm-down" id="footer" style={{ height: '75px' }}>
      <div className="col-xs-12 text-xs-center">
        <span className="footer" style={{ fontSize: '.75em' }}>{this.props.account === 'PAID' ? <Link to="/account">Account</Link> : <Link to="/pricing">Pricing</Link>} | <Link to="/terms">Terms</Link> | <Link to="/privacy">Privacy</Link> | <Link to="/about">About</Link></span>
        {this.props.account === 'PAID' && <div style={{ fontSize: '.75em' }}>Copyright NPM Notifier {moment().format('YYYY')}</div>}
      </div>
    </footer>;
  }
}

Footer.propTypes = {
  account: React.PropTypes.string
};
