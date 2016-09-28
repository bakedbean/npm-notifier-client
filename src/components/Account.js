'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';
import {Link} from 'react-router';
import moment from 'moment';

export const Account = React.createClass({
  componentWillMount: function() {
    if (this.props.location.query.state === 'qzrghtksjh') {
      this.props.setupGithub(this.props.location.query.code);
    }
  },
  handleChange: function(pref, event) {
    if (event.currentTarget.type === 'checkbox') {
      this.props.updatePref(pref, !this.props[pref]);
    } else {
      this.props.updatePref(pref, event.currentTarget.value);
    }
  },
  handleRepos: function(event) {
    this.props.saveRepo(event.currentTarget.checked ? 'add' : 'remove', this.props.github.get('repos').find(r => String(r.get('id')) === String(event.currentTarget.value)));
  },
  updateRepo: function(repo) {
    this.props.updateRepo(repo);
  },
  setupGithub: function() {
    window.location = 'https://github.com/login/oauth/authorize?client_id=' + this.props.github.get('id') + '&scope=repo&state=qzrghtksjh';
  },
  save: function() {
    this.props.updateUser(this.props.email_pref, this.props.slack_pref, this.props.slack_webhook_url, this.props.github.get('saved_repos'));
  },
  render: function() {
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
            {this.props.github.get('saved_repos').size > 0 && <div className="repos">
              <strong>Syncing:</strong>
              <table className="table table-sm table-striped">
                <thead>
                  <tr>
                    <th>Repository</th>
                    <th>Pull Requests</th>
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
});

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
