'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';
import LoginEmail from './LoginEmail';
import LoginCode from './LoginCode';
import How from './How';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return <div className="row login content">
      <How show={this.state.showModal} toggle={this.toggleModal} />

      <div className="col-xs-12 offset-lg-4 col-lg-4 text-xs-center">
        {!this.props.auth.get('email') && <h3>Manage NPM packages<br/>simply and easily.</h3>}
        {!this.props.auth.get('email') && <LoginEmail {...this.props} />}
        {this.props.auth.get('email') && <LoginCode {...this.props} />}
        <a href="Javascript: void(0)" onClick={this.toggleModal}>How it works</a>
      </div>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.reducer.get('auth'),
    alerts: state.reducer.get('alerts')
  };
}

export const LoginContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Login);
