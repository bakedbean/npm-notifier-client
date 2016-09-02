import request from './request';
import {server, legacy} from './platform';

/**
 * @function Network
 * @description Factory function to create a object that can send
 * requests to a specific resource on the server.
 * @param {string} resource The resource used for config
 */
const Network = resource => {
  let buildURL = ({ params, id, resource } = {}) => {
    let parameters = [
      server(),
      'api'
    ];

    if (resource) parameters = parameters.concat([resource]);
    if (id) parameters = parameters.concat([id]);

    if (params) {
      return parameters.join('/') + params;
    }
    return parameters.join('/');
  }

  // Default options used for every request
  const defaultOptions = {
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  return {

    /**
     * @function post
     * @description Make a POST request.
     * @param {string} path
     * @param {object} body
     * @param {object} options
     * @returns {promise}
     */
    post: (path, body, options = {}) => {
      return request(buildURL(path), Object.assign(
        options,
        defaultOptions,
        {
          method: 'POST',
          body: JSON.stringify(body)
        }
      ));
    },

    /**
     * @function post
     * @description Make a GET request.
     * @param {string} path
     * @param {object} options
     * @returns {promise}
     */
    get: (path, options = {}) => {
      return request(buildURL(path), Object.assign(
        options,
        defaultOptions,
        { method: 'GET' }
      ));
    },

    /**
     * @function edit
     * @description Make a PUT request.
     * @param {string} path
     * @param {object} body
     * @param {object} options
     * @returns {promise}
     */
    edit: (path, body, options = {}) => {
      return request(buildURL(path), Object.assign(
        options,
        defaultOptions,
        { 
          method: 'PUT',
          body: JSON.stringify(body)
        }
      ));
    },

    /**
     * @function delete
     * @description Make a DELETE request.
     * @param {string} path
     * @param {object} options
     * @returns {promise}
     */
    delete: (path, options = {}) => {
      return request(buildURL(path), Object.assign(
        options,
        defaultOptions,
        { method: 'DELETE' }
      ));
    },

    ping: () => request(buildURL(), { method: 'GET' })
  };
};

export default Network;
