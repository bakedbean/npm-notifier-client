'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions';

export const About = React.createClass({
  render: function() {
    return <div className="row">
      <div className="col-xs-12" style={{ marginTop: '20px' }}>
        <h2>About NPM Notifier</h2>
        <hr/>
        <p>I've always been a bit annoyed that there's no straightforward way to stay on top of package version changes via npm.</p>
        <p>Over the years, every so often I'd ask my friends, is there a way yet to be notified when npm package versions change?</p>
        <p>The answer would always be a dejected "no"... So finally I decided to just build it myself.</p>
        <p>I hope others find some value from this, as it has certainly made it easier for me to stay informed and on top of things.</p>
        <hr/>
      </div>
    </div>;
  }
});

function mapStateToProps(state) {
  return {

  };
}

export const AboutContainer = connect(
  mapStateToProps,
  Object.assign(actions),
)(About);
