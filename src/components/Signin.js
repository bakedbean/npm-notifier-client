'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';
import LoginEmail from './LoginEmail';
import LoginCode from './LoginCode';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="row signin content-signin">
      <div className="col-xs-12 offset-lg-4 col-lg-4 signin text-xs-center">
        {!this.props.auth.get('email') && <h3>Sign into NPM Notifier</h3>}
        {!this.props.auth.get('email') && <LoginEmail {...this.props} signin={true} />}
        {this.props.auth.get('email') && <LoginCode {...this.props} />}
      </div>
    </div>;
  }
}

Signin.propTypes = {
  auth: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    auth: state.reducer.get('auth'),
    alerts: state.reducer.get('alerts')
  };
}

export const SigninContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Signin);
