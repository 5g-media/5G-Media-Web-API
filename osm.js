var axios = require("axios");
var https = require("https");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

/**
 * @module OSM
 */

/**
 * OSM Auth Response model
 * @typedef {Object} OSMAuthResponse
 * @property {string} expires
 * @property {string} remote_host
 * @property {string} admin
 * @property {string} remote_port
 * @property {string} id
 * @property {string} username
 * @property {string} project_id
 * @property {string} _id
 * @property {string} issued_at
 */

/**
 * Represents a osm authentication.
 * @param {string} username - osm user name.
 * @param {string} password - osm user password.
 * @param {string} project_id - osm project ID.
 * @return {OSMAuthResponse} osm token model
 */
exports.osmAuthToken = (username, password, project_id) => {
  return new Promise(resolve => {
    const url = `https://${process.env.OSM_IP}:${process.env.OSM_NBI_PORT}/osm/admin/v1/tokens`;
    axios
      .post(
        url,
        { username, password, project_id },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json"
          }
        },
        { httpsAgent }
      )
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
            case 403:
              resolve(error.response.data);
            case 404:
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

/**
 * Represents a NSD List.
 * @param {string} token - osm access token.
 * @return {array<NSD>} NSD model array
 */
exports.getNsds = token => {
  return new Promise(resolve => {
    const url = `https://${process.env.OSM_IP}:${process.env.OSM_NBI_PORT}/osm/nsd/v1/ns_descriptors`;
    const AuthStr = "Bearer ".concat(token);
    axios
      .get(url, { headers: { Authorization: AuthStr } }, { httpsAgent })
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
            case 403:
              resolve(error.response.data);
            case 404:
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

/**
 * NSD
 * @typedef {Object} NSD
 * @property {array} constituent-vnfd
 * @property {string} description
 * @property {string} version
 * @property {string} vendor
 * @property {array} vld
 * @property {string} id
 * @property {string} logo
 * @property {object} _admin
 * @property {string} _id
 * @property {string} name
 * @property {string} short-name
 */

/**
 * Represents a NSD Info.
 * @param {string} token - osm access token.
 * @param {string} nsdInfoId - nsd Id.
 * @return {NSD} NSD model
 */
exports.getNsdInfo = (nsdInfoId, token) => {
  return new Promise(resolve => {
    const url = `https://${process.env.OSM_IP}:${process.env.OSM_NBI_PORT}/osm/nsd/v1/ns_descriptors/${nsdInfoId}`;
    const AuthStr = "Bearer ".concat(token);
    axios
      .get(url, { headers: { Authorization: AuthStr } }, { httpsAgent })
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
            case 403:
              resolve(error.response.data);
            case 404:
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

/**
 * VNFD
 * @typedef {Object} VNFD
 * @property {string} _id
 * @property {string} vendor
 * @property {object} _admin
 * @property {string} id
 * @property {string} logo
 * @property {string} version
 * @property {array} connection-point
 * @property {array} scaling-group-descriptor
 * @property {string} short-name
 * @property {string} description
 * @property {string} name
 * @property {object} mgmt-interface
 * @property {array} vdu
 */

/**
 * Represents a VNFD List.
 * @param {string} token - osm access token.
 * @return {array<VNFD>} VNFD model array
 */
exports.getVnfds = token => {
  return new Promise(resolve => {
    const url = `https://${process.env.OSM_IP}:${process.env.OSM_NBI_PORT}/osm/vnfpkgm/v1/vnf_packages`;
    const AuthStr = "Bearer ".concat(token);
    axios
      .get(url, { headers: { Authorization: AuthStr } }, { httpsAgent })
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
            case 403:
              resolve(error.response.data);
            case 404:
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

/**
 * Represents a VNFD Info.
 * @param {string} token - osm access token.
 * @param {string} vnfPkgId - vnfd Id.
 * @return {VNFD} VNFD model
 */
exports.getVnfdInfo = (vnfPkgId, token) => {
  return new Promise(resolve => {
    const url = `https://${process.env.OSM_IP}:${process.env.OSM_NBI_PORT}/osm/vnfpkgm/v1/vnf_packages/${vnfPkgId}`;
    const AuthStr = "Bearer ".concat(token);
    axios
      .get(url, { headers: { Authorization: AuthStr } }, { httpsAgent })
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
            case 403:
              resolve(error.response.data);
            case 404:
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

/**
 * Represents a Create a new NS descriptor resource.
 * @param {string} token - osm access token.
 * @return {NSD} NSD model
 */
exports.createNsd = (CreateNsdInfoRequest, token) => {
  return new Promise(resolve => {
    const url = `https://${process.env.OSM_IP}:${process.env.OSM_NBI_PORT}/osm/vnfpkgm/v1/ns_descriptors`;
    const AuthStr = "Bearer ".concat(token);
    axios
      .post(
        url,
        { headers: { Authorization: AuthStr } },
        { CreateNsdInfoRequest },
        { httpsAgent }
      )
      .then(response => {
        switch (response.status) {
          case 201:
            resolve(response.data);
        }
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              resolve(error.response.data);
            case 401:
              resolve(error.response.data);
            case 403:
              resolve(error.response.data);
            case 404:
              resolve(error.response.data);
            case 405:
              resolve(error.response.data);
            case 406:
              resolve(error.response.data);
            case 500:
              resolve(error.response.data);
            case 503:
              resolve(error.response.data);
            case 504:
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

/**
 * Represents a Create a new VNF package resource
 * @param {string} token - osm access token.
 * @return {VNFD} VNFD model
 */
exports.createVnfd = (CreateVnfdInfoRequest, token) => {
  return new Promise(resolve => {
    const url = `https://${process.env.OSM_IP}:${process.env.OSM_NBI_PORT}/osm/vnfpkgm/v1/vnf_packages`;
    const AuthStr = "Bearer ".concat(token);
    axios
      .post(
        url,
        { headers: { Authorization: AuthStr } },
        { CreateVnfdInfoRequest },
        { httpsAgent }
      )
      .then(response => {
        switch (response.status) {
          case 201:
            resolve(response.data);
        }
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              resolve(error.response.data);
            case 401:
              resolve(error.response.data);
            case 403:
              resolve(error.response.data);
            case 404:
              resolve(error.response.data);
            case 405:
              resolve(error.response.data);
            case 406:
              resolve(error.response.data);
            case 500:
              resolve(error.response.data);
            case 503:
              resolve(error.response.data);
            case 504:
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
