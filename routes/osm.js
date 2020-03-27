const express = require('express');
const router = express.Router();
const axios = require('axios');
const https = require('https');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

router.route('/osmAuthToken').post((req, res) => {
  const url = `https://${process.env.OSM_IP}:${process.env.OSM_NBI_PORT}/osm/admin/v1/tokens`;
  const { username, password, project_id } = req.body;
  axios
    .post(
      url,
      { username, password, project_id },
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        }
      },
      { httpsAgent }
    )
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
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

router.route('/getNsds').post((req, res, next) => {
  const url = `https://${process.env.OSM_IP}:${process.env.OSM_NBI_PORT}/osm/nsd/v1/ns_descriptors`;
  const { token } = req.body;
  const AuthStr = 'Bearer '.concat(token);
  axios
    .get(url, { headers: { Authorization: AuthStr } }, { httpsAgent })
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
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

router.route('/getNsdInfo').post((req, res, next) => {
  const { nsdInfoId, token } = req.body;
  const url = `https://${process.env.OSM_IP}:${process.env.OSM_NBI_PORT}/osm/nsd/v1/ns_descriptors/${nsdInfoId}`;
  const AuthStr = 'Bearer '.concat(token);
  axios
    .get(url, { headers: { Authorization: AuthStr } }, { httpsAgent })
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
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

router.route('/getVnfds').post((req, res, next) => {
  const url = `https://${process.env.OSM_IP}:${process.env.OSM_NBI_PORT}/osm/vnfpkgm/v1/vnf_packages`;
  const { token } = req.body;
  const AuthStr = 'Bearer '.concat(token);
  axios
    .get(url, { headers: { Authorization: AuthStr } }, { httpsAgent })
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
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

router.route('/getVnfdInfo').post((req, res, next) => {
  const { vnfPkgId, token } = req.body;
  const url = `https://${process.env.OSM_IP}:${process.env.OSM_NBI_PORT}/osm/vnfpkgm/v1/vnf_packages/${vnfPkgId}`;
  const AuthStr = 'Bearer '.concat(token);
  axios
    .get(url, { headers: { Authorization: AuthStr } }, { httpsAgent })
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
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

module.exports = router;
