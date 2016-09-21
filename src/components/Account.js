'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';
import {Link} from 'react-router';
import moment from 'moment';

export const Account = React.createClass({
  handleChange: function(pref, event) {
    if (event.currentTarget.type === 'checkbox') {
      this.props.updatePref(pref, !this.props[pref]);
    } else {
      this.props.updatePref(pref, event.currentTarget.value);
    }
  },
  setupGithub: function() {
    window.location = 'https://github.com/login/oauth/authorize?client_id=' + this.props.github_id + '&scope=repo&state=qzrghtksjh';
  },
  save: function() {
    this.props.updateUser(this.props.email_pref, this.props.slack_pref, this.props.slack_webhook_url);
  },
  render: function() {
    return <div className="row content account">
      <div className="col-xs-12" style={{ marginTop: '20px' }}>
        <h2>Account</h2>
        <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section">
            <strong>Account Type:</strong> {this.props.account === 'FREE' && "Free - track up to 5 packages"} {this.props.account === 'PAID' && "Unlimited - track as many packages as you want"}
          </div>
        </div>
        {this.props.account === 'PAID' && <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section">
            <strong>Unlimited account:</strong> created {moment(this.props.lastPaid).format('MM/DD/YYYY')} (Expires {moment(this.props.lastPaid).to(moment(this.props.lastPaid).add(365, 'days'))}) <Link to="/pricing">Renew</Link>
          </div>
        </div>}
        <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section">
            <strong>Currently tracking:</strong> {this.props.packages.size} packages
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section">
            <strong>Github Integration</strong>
            <p>
              Configure github repos to monitor package.json changes and update the packages you're tracking automatically.
            </p>
            <p>
              <button className="btn btn-sm" onClick={this.setupGithub}><i className="fa fa-github"></i> Configure</button>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section">
            <strong>Notification Preferences:</strong>
            <p>
              <span className="preference"><input type="checkbox" 
                value="email_pref"
                checked={this.props.email_pref}
                onChange={this.handleChange.bind(this, 'email_pref')} /> Email Notifications</span>
              {this.props.account === 'PAID' && 
                <span className="preference"><input type="checkbox" 
                  value="slack_pref" 
                  checked={this.props.slack_pref} 
                  onChange={this.handleChange.bind(this, 'slack_pref')} /> Slack Notifications</span>}
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
        {this.props.account === 'FREE' && <div className="row">
          <div className="col-xs-12 col-lg-6 offset-lg-3 section text-xs-center text-lg-center">
            Upgrade to <Link to="/pricing">unlimited</Link> and setup Slack notifications
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
    packages: state.reducer.get('savedPackages'),
    github_id: state.reducer.get('github_id')
  };
}

export const AccountContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Account);
