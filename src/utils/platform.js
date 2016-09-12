'use strict';

export const client = () => {
  let urlParts = window.location.href.split('/'); 
  return urlParts[0] + '//' + urlParts[2];
}

export const platform = () => {
  return {
    dev: client() === 'http://localhost:8090',
    test: client() === 'about:blank//undefined',
    production: client() === 'https://www.npmnotifier.com' || client() === 'https://npmnotifier.com' || client() === 'http://www.npmnotifier.com' || client() === 'http://npmnotifier.com'
  }
}

export const server = () => {
  if (platform().dev) return 'http://localhost:8080';
  if (platform().test) return 'http://localhost:8181';
  if (platform().production) return 'https://www.npmnotifier.com';
}
