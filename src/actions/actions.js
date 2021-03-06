'use strict';

import network from '../utils/network';

export const dashboard = () => ({
  type: 'DASHBOARD',
  payload: network().get({
    resource: 'api/dashboard',
    params: '?token=' + localStorage.getItem('token')
  })
});

export const dashboardView = view => ({
  type: 'DASHBOARD_VIEW',
  view: view
});

export const deletePackageFromApi = id => ({
  type: 'DELETE_PACKAGE_FROM_API',
  payload: network().delete({
    resource: 'api/packages',
    params: '/' + id + '/?token=' + localStorage.getItem('token')
  })
});

export const deletePackageRequest = id => {
  return (dispatch, getState) => {
    dispatch(trackDeletedPackage(id));
    return dispatch(deletePackageFromApi(id));
  }
};

export const login = email => ({
  type: 'LOGIN',
  payload: network().post({
    resource: 'register'
  }, {
    email: email.toLowerCase()
  })
});

export const packageAdd = () => ({
  type: 'PACKAGE_ADD'
});

export const packageRemove = index => ({
  type: 'PACKAGE_REMOVE',
  index: index
});

export const packageUpdate = ( index, name ) => ({
  type: 'PACKAGE_UPDATE',
  index: index,
  name: name.toLowerCase()
});

export const packagesReset = () => ({
  type: 'PACKAGES_RESET'
});

export const packagesSave = (packages) => ({
  type: 'PACKAGES_SAVE',
  payload: network().post({
    resource: 'api/packages',
    params: '?token=' + localStorage.getItem('token')
  }, {
    packages: JSON.stringify(packages.toJS())
  })
});

export const purchaseUnlimited = ( token ) => ({
  type: 'PURCHASE_UNLIMITED',
  payload: network().post({
    resource: 'unlimited'
  }, {
    token: JSON.stringify(token)
  })
});

export const saveRepo = (event, repo) => ({
  type: 'SAVE_REPO',
  event: event,
  repo: repo
});

export const searchPackages = needle => ({
  type: 'SEARCH_PACKAGES',
  needle: needle.toLowerCase()
});

export const sendContact = ( name, email, message ) => ({
  type: 'SEND_CONTACT',
  payload: network().post({
    resource: 'contact'
  }, {
    name: name,
    email: email,
    message: message
  })
});

export const setupGithub = code => ({
  type: 'SETUP_GITHUB',
  payload: network().get({
    resource: 'api/github',
    params: '?token=' + localStorage.getItem('token') + '&code=' + code
  })
});

export const setupRepos = token => ({
  type: 'SETUP_REPOS',
  payload: fetch('https://api.github.com/user/repos', {
    method: 'GET',
    headers: {
      'Authorization': 'token ' + token
    }
  }).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }).catch(err => err)
});

export const sortPackages = field => ({
  type: 'SORT_PACKAGES',
  field: field
});

export const trackDeletedPackage = id => ({
  type: 'TRACK_DELETED_PACKAGE',
  id: id
});

export const updatePackage = ( id, pref ) => ({
  type: 'UPDATE_PACKAGE',
  payload: network().edit({
    resource: 'api/packages',
    params: '/' + id + '/?token=' + localStorage.getItem('token')
  }, {
    pref: pref
  })
});

export const updatePref = ( pref, value ) => ({
  type: 'UPDATE_PREF',
  pref: pref,
  value: value
});

export const updateAlert = alert => ({
  type: 'UPDATE_ALERT',
  alert: alert
});

export const updateRepo = repo => ({
  type: 'UPDATE_REPO',
  repo: repo
});

export const updateUser = (email, slack, webhook, repos) => ({
  type: 'UPDATE_USER',
  payload: network().edit({
    resource: 'api/user',
    params: '?token=' + localStorage.getItem('token')
  }, {
    email_pref: email,
    slack_pref: slack,
    slack_webhook_url: webhook,
    github_repos: repos
  })
});

export const uploadFile = (url, file) => ({
  type: 'UPLOAD_FILE',
  payload: fetch(url, {
    method: 'POST',
    body: file
  }).then(response => response.json())
});

export const validate = (email, code) => ({
  type: 'VALIDATE',
  payload: network().post({
    resource: 'validate'
  }, {
    email: email.toLowerCase(),
    code: code
  })
});
