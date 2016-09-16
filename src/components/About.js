'use strict';

import React from 'react';
import {Link} from 'react-router';

export const About = React.createClass({
  render: function() {
    return <div className="row content account">
      <div className="col-xs-12 col-lg-4 offset-lg-4">
        <h2>About</h2>
        <p>My name is Eben Goodman, I'm a full stack developer living in the beautiful state of Vermont.</p>
        <p>NPM Notifier is a labor born of frustration for me.  I got tired of returning to finished projects, only to find the package dependencies 15 versions out of date with breaking backwards compatibility.</p>
        <p>So, instead of complaining to friends and peers, I decided to build my own solution.  This way when I visit old projects and find the dependencies 15 versions out of date with breaking backwards compatibility, I have no excuses...</p>
        <p>&nbsp;</p>        
        <p>NPM Notifier is React, Redux, Immutable and Webpack on the front end, Node, Express, Mongo and some bash and make on the back end.</p>        
        <p>&nbsp;</p>        
        <p>Are you an engineering or hiring manager?  Looking for an experienced developer that writes high quality, tested code but most importantly knows how to ship product? <Link to="/contact">Drop me a line</Link>, I'm always open to interesting opportunities.</p>        
      </div>
    </div>;
  }
});
