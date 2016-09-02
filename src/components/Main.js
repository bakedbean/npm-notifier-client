import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

export const Main = React.createClass({
  render: function() {
    return <div id="main-wrapper" className="container-fluid">
        <div className="row row-layout">
          <div className="col-xs-12 col-lg-10 offset-lg-1">
            <div className="row">
              <div className="col-xs-12 header">
                NPM Notifier
              </div>
            </div>
            <div className="fullheight">
              {this.props.children}
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
