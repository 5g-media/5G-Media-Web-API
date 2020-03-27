var axios = require("axios");

/**
 * @module AAA
 */

/**
 * AAA Auth Response model
 * @typedef {Object} AAAResponse
 * @property {string} access_token
 * @property {string} expires_id
 * @property {string} refresh_expires_in
 * @property {string} refresh_token
 * @property {string} token_type
 * @property {string} 'not-before-policy'
 * @property {string} session_state
 * @property {string} scope
 */

/**
 * Client Credentials model
 * @typedef {Object} clientCredentials
 * @property {string} client_id
 * @property {string} username
 * @property {string} password
 * @property {string} grant_type
 * @property {string} client_secret
 */

/**
 * Represents a Get an access token using resource owner password credentials.
 * @param {clientCredentials} clientCredentials - JSON Object that includes client_id, username, password, grant_type and client_secret.
 * @return {AAAResponse} AAAResponse
 */
exports.getToken = clientCredentials => {
  return new Promise(resolve => {
    const url = `https://${process.env.AAA_IP}:${process.env.AAA_PORT}/auth/realms/osm/protocol/openid-connect/token`;
    axios
      .post(url, { clientCredentials })
      .then(response => {
        switch (response.status) {
          case 200:
            resolve(response.data);
        }
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              resolve(error.response.data);
            default:
              resolve(error.response.data);
          }
        } else {
          resolve(error);
        }
      });
  });
};
