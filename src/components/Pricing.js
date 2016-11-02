'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';
import {Link} from 'react-router';
import classNames from 'classnames';
import config from 'config';
import How from './How';

export default class Pricing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  componentWillMount = () => {
    this.handler = StripeCheckout.configure({
      key: config.stripe_key,
      image: 'img/npm-notifier-logo.png',
      locale: 'auto',
      token: token => this.props.purchaseUnlimited(token)
    });
  }

  componentWillUnmount = () => {
    this.handler.close();
  }

  componentDidUpdate = () => {
    if (this.props.auth.get('email')) {
      this.props.history.push('/login');
    }
  }

  purchase = type => {
    if (type === 'free') {
      window.location = '/';
    } else {
      this.handler.open({
        name: 'NPM Notifier',
        description: 'Unlimited Notifications',
        amount: config.cost
      });
    }
  }

  toggleModal = () => {
    return this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return <div>
      <How show={this.state.showModal} toggle={this.toggleModal} />

      <div className="row content pricing">
        <div className="col-xs-12 col-lg-4 offset-lg-4 option" style={{ marginTop: '20px' }}>
          <h2>NPM Version Change Notifications</h2>
          <div className={classNames('option', { 'offset-lg-4': this.props.account === 'PAID' })}>
            <h5><a href="Javascript: void(0)" onClick={this.toggleModal}>How it works.</a></h5>
            
            <p className="price">$25/year</p>
            <button id="unlimited" onClick={() => this.purchase('unlimited')} className="btn btn-block btn-lg btn-default">{this.props.account === 'PAID' ? "Renew" : "Set Up"}</button>
            {this.props.account === '' && <button id="unlimited" className="btn btn-lg btn-block btn-default" onClick={() => window.location = '/'}>30 Day Trial</button>}
          </div>
          <div className="option">
            <h1 className="price-icon"><i className="fa fa-github"></i></h1>
            <p>Connect NPM Notifier to your github account and monitor multiple repository package.json updates.</p>
            <h1 className="price-icon"><i className="fa fa-code-fork"></i></h1>
            <p>Automatically create pull requests with updated dependency versions.</p>
            <h1 className="price-icon"><i className="fa fa-cloud-upload"></i></h1>
            <p>Don't want to use Github? Manually upload multiple package.json files.</p>
            <h1 className="price-icon"><i className="fa fa-envelope-square"></i></h1>
            <p>Receive a daily email digest of changes to the packages you're tracking.</p>
            <h1 className="price-icon"><i className="fa fa-slack"></i></h1>
            <p>Configure a Slack web hook to receive daily digests to Slack channels.</p>
            <h1 className="price-icon"><i className="fa fa-gears"></i></h1>
            <p>Control notifications globally, or per package.</p>
            <h5 className="price">30 Day Trial</h5>
            <p><a href="/" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>Try it out free for 30 days.</a></p>
          </div>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <div className="hidden-sm-up text-xs-center" style={{ margin: '10px 0 10px 0' }}>
            <Link to="/terms">Terms of Service</Link> | <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>;
  }
}

Pricing.propTypes = {
  auth: React.PropTypes.object,
  account: React.PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {
    auth: state.reducer.get('auth'),
    account: state.reducer.get('account'),
    history: ownProps.history
  };
}

export const PricingContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Pricing);
