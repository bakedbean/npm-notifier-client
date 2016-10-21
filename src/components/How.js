'use strict';

import React from 'react';
import Modal from 'react-modal';

export default class How extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Modal
      ref="mymodal"
      isOpen={this.props.show}
      closeTimeoutMS={150}
      onRequestClose={this.props.toggle}
      className="modal-dialog"
      overlayClassName="modal">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={this.props.toggle}>
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
            <p>The github integration also allows for NPM Notifier to submit pull requests with any package changes. In environments with solid test suites and continuous integration, this can mean seamless management of dependency versions.</p>
          </div>
        </div>
    </Modal>
  }
}

How.propTypes = {
  show: React.PropTypes.bool,
  toggle: React.PropTypes.func
};
