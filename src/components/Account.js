'use strict';

import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {actions} from '../actions';
import {Link} from 'react-router';
import moment from 'moment';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  componentWillMount = () => {
    if (this.props.location.query.state === 'qzrghtksjh') {
      this.props.setupGithub(this.props.location.query.code);
    }
  }

  handleChange = (pref, event) => {
    if (event.currentTarget.type === 'checkbox') {
      this.props.updatePref(pref, !this.props[pref]);
    } else {
      this.props.updatePref(pref, event.currentTarget.value);
    }
  }

  handleRepos = event => {
    this.props.saveRepo(event.currentTarget.checked ? 'add' : 'remove', this.props.github.get('repos').find(r => String(r.get('id')) === String(event.currentTarget.value)));
  }
  
  updateRepo = repo => {
    this.props.updateRepo(repo);
  }

  setupGithub = () => {
    window.location = 'https://github.com/login/oauth/authorize?client_id=' + this.props.github.get('id') + '&scope=repo&state=qzrghtksjh';
  }

  save = () => {
    this.props.updateUser(this.props.email_pref, this.props.slack_pref, this.props.slack_webhook_url, this.props.github.get('saved_repos'));
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    let duration = 365;
    if (this.props.account !== 'PAID') duration = 30;

    let repos = this.props.github.get('repos').map((r, i) => <div key={i}><input type="checkbox" 
      value={r.get('id')} 
      onChange={this.handleRepos} /> {r.get('name')}</div>)

    let savedRepos = this.props.github.get('saved_repos').map((r, i) => {
      return <tr key={i}>
        <td><a href="Javascript: void(0);" onClick={() => this.props.saveRepo('remove', r)}><i className="fa fa-times"></i></a> {r.get('name')}</td>
        <td><input type="checkbox"
          checked={r.get('pr')}
          onChange={() => this.updateRepo(r)} /></td>
      </tr>;
    });

    return <div className="row content account">
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
              <h4 className="modal-title">Pull Requests</h4>
            </div>
            <div className="modal-body">
              <p>If pull requests are enabled for a repository, NPM Notifier will perform the following actions when there are package updates:</p>
              <ul>
                <li>Create a new branch from <code>master</code> named <code>npm-notifier-updates</code></li>
                <li>Add a new commit to <code>npm-notifier-updates</code> with any new package versions reflected in <code>package.json</code></li>
                <li>Add a new pull request titled "NPM Notifier package.json updates"</li>
                <li>If the <code>npm-notifier-updates</code> branch exists, additional NPM Notifier updates will be added as new commits</li>
                <li>All activity will be assigned to the user that authenticates NPM Notifier for oauth token access</li>
              </ul>
            </div>
          </div>
      </Modal>
      <div className="col-xs-12" style={{ marginTop: '20px' }}>
        <h2>Account</h2>
        <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section">
            <strong>Account Type:</strong> {this.props.account === 'FREE' && "Trial"} {this.props.account === 'PAID' && "Paid"}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section">
            <strong>Account:</strong> created {moment(this.props.lastPaid).format('MM/DD/YYYY')} (Expires {moment(this.props.lastPaid).to(moment(this.props.lastPaid).add(duration, 'days'))}) <Link to="/pricing">Renew</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section">
            <strong>Currently tracking:</strong> {this.props.packages.size} packages
          </div>
        </div>
        {this.props.github.get('token') === '' && <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section">
            <strong>Github Integration</strong>
            <p>
              Configure github repos to monitor package.json changes and update the packages you're tracking automatically.
            </p>
            <p>
              <button className="btn btn-sm" onClick={this.setupGithub}><i className="fa fa-github"></i> Configure</button>
            </p>
          </div>
        </div>}
        {this.props.alerts.get('github') && <div className="col-xs-12 col-lg-6 offset-lg-3 alert alert-danger">
          <strong>Github Integration</strong>
          <p>
            Uh oh, looks like there was a problem connecting to the Github API.<br/>You may need re-authorize NPM Notifier?
          </p>
          <p>
            <button className="btn btn-sm" onClick={this.setupGithub}><i className="fa fa-github"></i> Configure</button>
          </p>
        </div>}
        {this.props.github.get('token') !== '' && !this.props.alerts.get('github') && <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section">
            <strong>Github Integration</strong>
            <p><button className="btn btn-sm" onClick={() => this.props.setupRepos(this.props.github.get('token'))}><i className="fa fa-github"></i> Configure Repositories</button></p>
            {repos.size > 0 && <p><strong>Choose repositories to sync:</strong><br/><small>NOTE: Repositories without a top level package.json will be ignored.</small></p>}
            {repos.size > 0 && <div className="repos">
              {repos}
            </div>}
            {this.props.github.get('saved_repos').size > 0 && !this.state.prInfo && <div className="repos">
              <strong>Syncing:</strong>
              <table className="table table-sm table-striped">
                <thead>
                  <tr>
                    <th>Repository</th>
                    <th>Pull Requests <a href="#" onClick={this.toggleModal}><i className="fa fa-info-circle"></i></a></th>
                  </tr>
                </thead>
                <tbody>
                  {savedRepos}
                </tbody>
              </table>
            </div>}
          </div>
        </div>}
        <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section">
            <strong>Notification Preferences:</strong>
            <p>
              <span className="preference"><input type="checkbox" 
                value="email_pref"
                checked={this.props.email_pref}
                onChange={this.handleChange.bind(this, 'email_pref')} /> Email Notifications</span>
              <span className="preference"><input type="checkbox" 
                value="slack_pref" 
                checked={this.props.slack_pref} 
                onChange={this.handleChange.bind(this, 'slack_pref')} /> Slack Notifications</span>
            </p>
            {this.props.slack_pref && <p>Slack Webhook URL:<br/>
              <input type="text" 
                className="form-control" 
                name="slack_webhook_url" 
                placeholder="https://hooks.slack.com/services/..."
                value={this.props.slack_webhook_url}
                onChange={this.handleChange.bind(this, 'slack_webhook_url')} />
            </p>}
          </div>
        </div>
        {this.props.account !== 'PAID' && <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section text-xs-center text-lg-center">
            Upgrade to <Link to="/pricing">paid</Link> and keep receiving notifications.
          </div>
        </div>}
        <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 text-xs-center text-lg-center">
            <button className="btn btn-lg" onClick={() => this.save()}><span className="hidden-xs-down">{this.props.loading.get('account') ? <i className="fa fa-spin fa-circle-o-notch"></i> : "Save Changes"}</span><span className="hidden-sm-up">{this.props.loading.get('account') ? <i className="fa fa-spin fa-circle-o-notch"></i> : <i className="fa fa-save"></i>}</span></button>
            <button className="btn btn-lg" onClick={() => window.location = '/'}><span className="hidden-xs-down">Back to Dashboard</span><span className="hidden-sm-up"><i className="fa fa-dashboard"></i></span></button>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
    </div>;
  }
}

Account.propTypes = {
  loading: React.PropTypes.object,
  account: React.PropTypes.string,
  lastPaid: React.PropTypes.string,
  slack_webhook_url: React.PropTypes.string,
  email_pref: React.PropTypes.bool,
  slack_pref: React.PropTypes.bool,
  alerts: React.PropTypes.object,
  packages: React.PropTypes.object,
  github: React.PropTypes.object,
  setupGithub: React.PropTypes.func,
  updatePref: React.PropTypes.func,
  setupRepos: React.PropTypes.func,
  saveRepo: React.PropTypes.func,
  updateRepo: React.PropTypes.func,
  updateUser: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    loading: state.reducer.get('loading'),
    account: state.reducer.get('account'),
    lastPaid: state.reducer.get('lastPaid'),
    slack_webhook_url: state.reducer.get('slack_webhook_url'),
    email_pref: state.reducer.get('email_pref'),
    slack_pref: state.reducer.get('slack_pref'),
    alerts: state.reducer.get('alerts'),
    packages: state.reducer.get('savedPackages'),
    github: state.reducer.get('github')
  };
}

export const AccountContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Account);
