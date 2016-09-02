'use strict';

import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import {MainContainer} from './components/Main';
import App from './components/App';

export const routes = <Route component={App}>
  <Route path="/" component={MainContainer}></Route>
</Route>;
