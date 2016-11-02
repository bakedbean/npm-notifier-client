'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      comments: '',
      valid: true,
      sent: false
    };
  }

  handleChange = event => {
    if (event.currentTarget.name === 'email') {
      this.setState({ email: event.currentTarget.value });
    } else if (event.currentTarget.name === 'name') {
      this.setState({ name: event.currentTarget.value });
    } else {
      this.setState({ comments: event.currentTarget.value });
    }
  }

  validate = () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (re.test(this.state.email));
  }

  reValidate = () => {
    if (!this.state.valid && this.validate()) {
      this.setState({ valid: true });
    }
  }

  send = () => {
    if (this.validate()) {
      this.props.sendContact(this.state.name, this.state.email, this.state.comments);
      this.setState({ sent: true });
    } else {
      this.setState({ valid: false });
    }
  }

  render() {
    return <div className="row content account">
      {!this.state.sent && <div className="col-xs-12 col-lg-4 offset-lg-4" style={{ marginTop: '20px' }}>
        <h2>Contact</h2>
        <div className="form-group">
          Name:
          <input type="text" 
            name="name" 
            className="form-control" 
            value={this.state.name}
            onChange={this.handleChange} />
        </div>
        <div className="form-group">
          Email:
          <input type="email" 
            name="email" 
            className="form-control" 
            onKeyPress={this.reValidate()}
            value={this.state.email}
            onChange={this.handleChange} />

          {!this.state.valid && <div className="alert alert-danger">Invalid email address</div>}
        </div>
        <div className="form-group">
          Message:
          <textarea name="comments" 
            className="form-control" 
            value={this.state.comments}
            onChange={this.handleChange} />
        </div>
        <div className="form-group text-xs-center text-lg-center">
          <button className="btn btn-lg" onClick={() => this.send()}>Send</button>
        </div>
      </div>}
      {this.state.sent && <div className="col-xs-12 col-lg-4 offset-lg-4" style={{ marginTop: '20px' }}>
        <h2>Contact</h2>
        <p>Thanks for contacting me.  I'll be in touch soon.</p>
        <p>- Eben</p>
      </div>}
    </div>;
  }
}

Contact.propTypes = {
  sendContact: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    contacted: state.reducer.get('contacted')
  };
}

export const ContactContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(Contact);
