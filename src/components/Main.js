import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

export const Main = React.createClass({
  render: function() {
    return <div id="main-wrapper" className="container-fluid">
        <div className="row row-layout">
          <div className="col-xs-12 col-lg-10 offset-lg-1">
            <div className="row">
              <div className="col-xs-12 col-lg-8 header">
                <h4>
                  <img src="img/logo.svg" height="50" />
                  &nbsp;NPM Notifier
                </h4>
              </div>
              <div className="col-lg-4 header">
                <ul>
                  <li><a href="">About</a></li>
                  <li><a href="">Pricing</a></li>
                </ul>
              </div>
            </div>
            <div>
              {this.props.children}
            </div>
            <div className="row">
              <div className="col-xs-12 text-xs-center">
                <h6>Track 5 packages for free.</h6><h6>Check out pricing for more options.</h6>
                <span className="footer" style={{ fontSize: '.75em' }}><a href="">pricing</a> | <a href="">terms</a> | <a href="">privacy</a> | <a href="">about</a></span>
              </div>
            </div>
          </div>
        </div>
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
