'use strict';

import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import {MainContainer} from './components/Main';
import {LoginContainer} from './components/Login';
import {AboutContainer} from './components/About';
import App from './components/App';

export const routes = <Route component={App}>
  <Route path="/" component={MainContainer}>
    <IndexRedirect to="/login" />
    <Route path="login" component={LoginContainer}></Route>
    <Route path="about" component={AboutContainer}></Route>
  </Route>
</Route>;
