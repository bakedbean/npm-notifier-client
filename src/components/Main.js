'use strict';

import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Header} from './Header';
import {Footer} from './Footer';

export const Main = React.createClass({
  render: function() {
    return <div id="main-wrapper" className="container-fluid">
        <Header /> 
        <div className="row row-layout">
          <div className="col-xs-12">
            {this.props.children}
          </div>
        </div>
        <Footer /> 
      </div>;
  }
});

function mapStateToProps(state) {
  return {};
}

export const MainContainer = connect(
  mapStateToProps,
  actions
)(Main);
