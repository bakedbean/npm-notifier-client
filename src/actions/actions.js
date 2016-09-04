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


