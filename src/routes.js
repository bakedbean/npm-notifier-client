'use strict';

import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import {MainContainer} from './components/Main';
import {LoginContainer} from './components/Login';
import {SigninContainer} from './components/Signin';
import {PricingContainer} from './components/Pricing';
import {DashboardContainer} from './components/Dashboard';
import {AccountContainer} from './components/Account';
import {ContactContainer} from './components/Contact';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import About from './components/About';
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
    <Route path="pricing" component={PricingContainer}></Route>
    <Route path="contact" component={ContactContainer}></Route>
    <Route path="account" component={AccountContainer} onEnter={authenticated}></Route>
    <Route path="dashboard" component={DashboardContainer} onEnter={authenticated}></Route>
    <Route path="terms" component={Terms}></Route>
    <Route path="privacy" component={Privacy}></Route>
    <Route path="about" component={About}></Route>
  </Route>
</Route>;
