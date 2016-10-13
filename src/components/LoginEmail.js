'use strict';

import React from 'react';

export default class LoginEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      valid: true
    };
  }

  handleChange = event => {
    return this.setState({ email: event.currentTarget.value });
  }

  validate = () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (re.test(this.state.email));
  }

  reValidate = e => {
    if (!this.state.valid && this.validate()) {
      this.setState({ valid: true });
    }
    if (e.key === 'Enter') {
      this.props.login(this.state.email);
    }
  }

  doLogin = () => {
    if (this.validate()) {
      this.props.login(this.state.email);
    } else {
      this.setState({ valid: false });
    }
  }

  render() {
    return <div>
      <input type="email" 
        name="email" 
        placeholder="Email" 
        className="form-control" 
        value={this.state.email}
        onKeyPress={this.reValidate}
        onBlur={this.handleChange}
        onChange={this.handleChange} />

      {!this.state.valid && <div className="alert alert-danger">Invalid email address</div>}

      <button type="button" onClick={() => this.doLogin()} disabled={!this.state.valid} className="btn btn-lg btn-default">{this.props.signin ? "Request Sign In Code" : "Set Up"}</button>
    </div>;
  }
}

LoginEmail.propTypes = {
  login: React.PropTypes.func,
  signin: React.PropTypes.bool
};
