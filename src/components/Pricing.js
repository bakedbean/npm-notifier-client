'use strict';

import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {actions} from '../actions';
import {Link} from 'react-router';
import classNames from 'classnames';
import config from 'config';

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
      <Modal
        ref="mymodal"
        isOpen={this.state.showModal}
        closeTimeoutMS={150}
        onRequestClose={this.toggleModal}
        className="modal-dialog"
        overlayClassName="modal">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.toggleModal}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">How it works</h4>
            </div>
            <div className="modal-body">
              <p>After setting up an account, you'll be prompted to add some packages to manage.</p>
              <p>NPM Notifier offers three ways to manage packages:</p>
              <ul>
                <li>Manually add some packages</li>
                <li>Upload one or more package.json manifests</li>
                <li>Connect NPM Notifier to your github account using OAuth and monitor multiple repositories (This only works for repos that have a package.json at the root)</li>
              </ul>
              <p>NPM Notifier then scans your packages each night and looks for packages that have changed versions.</p>
              <p>Based on your configuration preferences, NPM Notifier will send an email digest and or Slack post with the packages that have changed.</p>
              <p>If you've connected to a github account, NPM Notifier also queries the github API each night to refresh the packages being managed.</p>
              <p>The github integration also allows for NPM Notifier to submit pull requests with any package changes. In environments with solid test suites and continuous integration, this can mean never again having to manually manage dependency versions.</p>
            </div>
          </div>
      </Modal>

      <div className="row content pricing">
        <div className="col-xs-12" style={{ marginTop: '20px' }}>
          <h2>NPM Notifier Pricing</h2>
          <div className="row">
            <div className={classNames('col-xs-12', 'col-lg-4', 'offset-lg-4', 'option', { 'offset-lg-4': this.props.account === 'PAID' })}>
              <h3 className="price">NPM Version Change Notifications</h3>
              <h5><a href="Javascript: void(0)" onClick={this.toggleModal}>How it works.</a></h5>
              
              <p className="price">$25/year</p>
              <button id="unlimited" onClick={() => this.purchase('unlimited')} className="btn btn-block btn-lg btn-default">{this.props.account === 'PAID' ? "Renew" : "Set Up"}</button>
              {this.props.account === '' && <button id="unlimited" className="btn btn-lg btn-block btn-default" onClick={() => window.location = '/'}>30 Day Trial</button>}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-lg-6 offset-lg-3 option">
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
          </div>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <div className="row hidden-sm-up" style={{ margin: '10px 0 10px 0' }}>
            <div className="col-xs-12 text-xs-center">
              <Link to="/terms">Terms of Service</Link> | <Link to="/privacy">Privacy Policy</Link>
            </div>
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
