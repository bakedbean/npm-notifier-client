'use strict';

import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import {MainContainer} from './components/Main';
import {LoginContainer} from './components/Login';
import {SigninContainer} from './components/Signin';
import {AboutContainer} from './components/About';
import {DashboardContainer} from './components/Dashboard';
import App from './components/App';

function isLoggedIn(nextState, replace, callback) {
  if (localStorage.getItem('token')) {
    replace('/dashboard');
  }
  callback();
}

function authenticated(nextState, replace, callback) {
  if (!localStorage.getItem('token')) {
    replace('/login');
  }
  callback();
}

export const routes = <Route component={App}>
  <Route path="/" component={MainContainer}>
    <IndexRedirect to="/login" />
    <Route path="signin" component={SigninContainer} onEnter={isLoggedIn}></Route>
    <Route path="login" component={LoginContainer} onEnter={isLoggedIn}></Route>
    <Route path="about" component={AboutContainer}></Route>
    <Route path="dashboard" component={DashboardContainer} onEnter={authenticated}></Route>
  </Route>
</Route>;
