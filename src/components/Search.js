'use strict';

import React from 'react';

export const Search = React.createClass({
  onChange: function(event) {
    this.props.searchPackages(event.currentTarget.value);
  },
  render: function() {
    return <div style={{ display: 'inline' }}>
      <input type="text" 
        className="search"
        onChange={this.onChange} />
    </div>;
  }
});
