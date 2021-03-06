var axios = require('axios');

/**
 * @module Monitoring
 */

/**
 * monitoring auth response model.
 * @typedef {Object} AuthResponse
 * @property {string} name
 * @property {string} key
 */

/**
 * Represents a monitoring authentication.
 * @param {string} username - grafana user name.
 * @param {string} password - grafana user password.
 * @param {string} apiKeyName - grafana API key name.
 * @param {string} role - grafana user role.
 * @return {AuthResponse} monitoring authentication response model
 */

exports.monitoringAuth = (username, password, apiKeyName, role) => {
  return new Promise(resolve => {
    const url = `http://${username}:${password}@${process.env.MONITORING_IP}:${process.env.MONITORING_PORT}/api/auth/keys`;
    console.log(url);
    axios
      .post(url, { name: apiKeyName, role })
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

/**
 * create monitor response.
 * @typedef {Object} CreateDashboardResponse
 * @property {string} slug
 * @property {string} status
 * @property {int} version
 */

/**
 * Create dashboard model.
 * @typedef {Object} dashboard
 * @property {string} id
 * @property {string} uid
 * @property {array} tags
 * @property {string} timezone
 * @property {string} schemaVersion
 * @property {string} version
 */

/**
 * Dashboard model
 * @typedef {Object} Dashboard
 * @property {dashboard} dashboard
 * @property {string} folderId
 * @property {boolean} overwrite
 */

/**
 * Represents a create dashboard.
 * @param {Dashboard} dashboard - create dashboard model
 * @param {string} token - grafana access token taken from auth interface.
 * @return {CreateDashboardResponse} create dashboard response model
 */
exports.createDashboard = (dashboard, token) => {
  return new Promise(resolve => {
    const url = `http://${process.env.MONITORING_IP}:${process.env.MONITORING_PORT}/api/dashboards/db`;
    const AuthStr = 'Bearer '.concat(token);
    axios
      .post(url, { ...dashboard }, { headers: { Authorization: AuthStr } })
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
            case 412:
              resolve(response.data);
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
 * metric
 * @typedef {object} metric
 * @property {string} __name__
 * @property {string} group
 * @property {string} instance
 * @property {string} job
 */

/**
 * MonitoringDataResponse
 * @typedef {object} MonitoringDataResponse
 * @property {string} status
 * @property {array<metric>} data
 */

/**
 * Represents query monitor data from Prometheus.
 * @param {string} query - grafana query string.
 * @return {MonitoringDataResponse} Get Queried Monitoring Data
 */
exports.getMonitoringData = query => {
  return new Promise(resolve => {
    const url = `http://${process.env.PROMETHEUS_IP}:${process.env.PROMETHEUS_PORT}/api/v1/query?query=${query}`;
    axios
      .get(url)
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
            case 412:
              resolve(response.data);
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
 * Represents a get requested monitoring container of cAdvisor.
 * @param {string} containerName - grafana user name.
 * @return {DockerContainer} Get Requested Docker Container Info 
 */
exports.getMonitoringContainer = containerName => {
  return new Promise(resolve => {
    const url = `http://${process.env.C_ADVISOR_IP}:${process.env.C_ADVISOR_PORT}/api/v1.3/docker/${containerName}`;
    axios
      .get(url)
      .then(response => {
        switch (response.status) {
          case 200:
            resolve(response.data);
        }
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
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
