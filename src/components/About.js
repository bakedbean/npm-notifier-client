'use strict';

import React from 'react';
import {Link} from 'react-router';

export default class About extends React.Component {
  render() {
    return <div className="row content account">
      <div className="col-xs-12 col-lg-6 offset-lg-3">
        <h2>About</h2>
        <p>My name is Eben Goodman, I'm a full stack developer living in Vermont.</p>
        <p>NPM Notifier is a labor born of frustration for me.</p>
        <p>I needed a more transparent and effortless way to stay on top of just how out of date my dependencies were getting, so I created NPM Notifier in an effort to solve this problem.</p>
        <p>I simply want to know when packages publish a new version.  That is what NPM Notifier does, with some added bells and whistles.</p>
        <p>NPM Notifier allows connecting to a github account, and can monitor repositories.  You can then opt into having NPM Notifier submit a pull request with an updated package.json when packages are updated.</p>
        <p><strong>For teams with solid test coverage and integrated CI, this can mean a seamless way to keep projects running with the latest dependencies.</strong></p>
        <hr/>
        <p>NPM Notifier is React, Redux, Immutable and Webpack on the front end, Node, Express, Mongo and some bash and make on the back end.</p>        
        <hr/>
        <p>Looking for an experienced developer that knows how to ship product? <Link to="/contact">Drop me a line</Link>, I'm always open to interesting opportunities.</p>        
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </div>
    </div>;
  }
}
