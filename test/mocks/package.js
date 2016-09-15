'use strict';

import {fromJS} from 'immutable';

export default function Package() {
  return fromJS({
    _package: {
      name: 'test',
      version: '1.0.0',
      checked_at: new Date(),
      updated_at: new Date(),
      isValid: true
    },
    active: true,
    email: true,
    slack: true
  });
}
