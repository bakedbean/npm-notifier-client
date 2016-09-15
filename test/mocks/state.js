'use strict';

import {fromJS} from 'immutable';

export default function Data() {
  return {
    reducer: fromJS({
      auth: {},
      account: '',
      email_pref: false,
      slack_pref: false,
      slack_webhook_url: '',
      packages: [],
      savedPackages: [],
      contacted: false,
      loading: {
        login: false,
        dashboard: false,
        packages: false,
        account: false,
        deleting: false
      }
    })
  }
} 

