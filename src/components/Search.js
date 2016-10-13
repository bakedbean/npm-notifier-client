'use strict';

import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = event => {
    this.props.searchPackages(event.currentTarget.value);
  }

  render() {
    return <div style={{ display: 'inline' }}>
      <input type="text" 
        className="search"
        onChange={this.onChange} />
    </div>;
  }
}

Search.propTypes = {
  searchPackages: React.PropTypes.func
};
