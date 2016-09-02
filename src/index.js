import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './reducers';
import {routes} from './routes';
import './polyfills';
import './styles/sass/main.scss';
import 'font-awesome/scss/font-awesome.scss';

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  promiseMiddleware({
    //additional config
  })
)(createStore);
const store = createStoreWithMiddleware(reducer, window.devToolsExtension ? window.devToolsExtension() : f => f)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
