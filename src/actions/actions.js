'use strict';

import network from '../utils/network';

export const login = (email) => ({
  type: 'LOGIN',
  payload: network().post({
    resource: 'register'
  }, {
    email: email
  })
});

export const validate = (email, code) => ({
  type: 'VALIDATE',
  payload: network().post({
    resource: 'validate'
  }, {
    email: email,
    code: code
  })
});

export const dashboard = () => ({
  type: 'DASHBOARD',
  payload: network().get({
    resource: 'api/dashboard',
    params: '?token=' + localStorage.getItem('token')
  })
});

export const packageAdd = () => ({
  type: 'PACKAGE_ADD'
});

export const packageRemove = ( index ) => ({
  type: 'PACKAGE_REMOVE',
  index: index
});

export const packageUpdate = ( index, name ) => ({
  type: 'PACKAGE_UPDATE',
  index: index,
  name: name
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

export const deletePackageFromApi = (id) => ({
  type: 'DELETE_PACKAGE_FROM_API',
  payload: network().post({
    resource: 'api/delete',
    params: '?token=' + localStorage.getItem('token')
  }, {
    id: id
  })
});
