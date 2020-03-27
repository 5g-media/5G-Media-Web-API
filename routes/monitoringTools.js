const express = require('express');
const router = express.Router();
const axios = require('axios');

router.route('/monitoringAuth').post((req, res, next) => {
  const { username, password, apiKeyName, role } = req.body;
  const url = `http://${username}:${password}@${process.env.MONITORING_IP}:${process.env.MONITORING_PORT}/api/auth/keys`;
  axios
    .post(url, { name: apiKeyName, role })
    .then(response => {
      switch (response.status) {
        case 200:
          return res.status(200).json(response.data);
      }
    })
    .catch(error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            return res.status(401).json(error.response.data);
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

router.route('/createDashboard').post((req, res, next) => {
  const { dashboard, token } = req.body;
  const url = `http://${process.env.MONITORING_IP}:${process.env.MONITORING_PORT}/api/dashboards/db`;
  const AuthStr = 'Bearer '.concat(token);
  axios
    .post(url, { ...dashboard }, { headers: { Authorization: AuthStr } })
    .then(response => {
      switch (response.status) {
        case 200:
          return res.status(200).json(response.data);
      }
    })
    .catch(error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            return res.status(401).json(error.response.data);
          case 403:
            return res.status(403).json(error.response.data);
          case 404:
            return res.status(404).json(error.response.data);
          case 412:
            return res.status(412).json(response.data);
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

router.route('/getMonitoringData').post((req, res, next) => {
  const { query } = req.body;
  const url = `http://${process.env.PROMETHEUS_IP}:${process.env.PROMETHEUS_PORT}/api/v1/query?query=${query}`;
  axios
    .get(url)
    .then(response => {
      switch (response.status) {
        case 200:
          return res.status(200).json(response.data);
      }
    })
    .catch(error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            return res.status(401).json(error.response.data);
          case 403:
            return res.status(403).json(error.response.data);
          case 404:
            return res.status(404).json(error.response.data);
          case 412:
            return res.status(412).json(response.data);
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

router.route('/getMonitoringContainer').post((req, res, next) => {
  const { containerName } = req.body;
  const url = `http://${process.env.C_ADVISOR_IP}:${process.env.C_ADVISOR_PORT}/api/v1.3/docker/${containerName}`;
  axios
    .get(url)
    .then(response => {
      switch (response.status) {
        case 200:
          return res.status(200).json(response.data);
      }
    })
    .catch(error => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            return res.status(400).json(error.response.data);
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

module.exports = router;
