'use strict';

import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';
import {Header} from './Header';
import {Footer} from './Footer';

export const Main = React.createClass({
  propTypes: {
    account: PropTypes.string
  },
  componentWillMount: function() {
    if (localStorage.getItem('token')) {
      this.props.dashboard();
    }
  },
  render: function() {
    return <div id="main-wrapper" className="container-fluid">
        {this.props.location.pathname !== '/signin' && <Header {...this.props} />}
        {this.props.children}
        {this.props.location.pathname !== '/signin' && <Footer {...this.props} />}
      </div>;
  }
});

function mapStateToProps(state) {
  return {
    account: state.reducer.get('account')
  };
}

export const MainContainer = connect(
  mapStateToProps,
  actions
)(Main);
