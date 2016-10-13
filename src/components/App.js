import React from 'react';
import {List, Map} from 'immutable';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children;
  }
}
