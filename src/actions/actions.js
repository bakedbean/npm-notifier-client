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


