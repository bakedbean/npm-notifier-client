import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

export const Main = React.createClass({
  render: function() {
    return <div id="main-wrapper" className="container-fluid">
        <div className="row row-layout">
          <div className="col-xs-12 col-lg-9 main">
            <div className="fullheight">
              Hello World
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
