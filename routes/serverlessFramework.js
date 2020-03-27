const express = require('express');
const router = express.Router();
const axios = require('axios');
const https = require('https');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

router.route('/getActions').post((req, res, next) => {
  const { namespace, limit, skip, token } = req.body;
  const params = { limit, skip };
  const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${namespace}/actions`;
  axios
    .get(url, { params })
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
            return res.status(400).json(error.response.data);
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

router.route('/getSingleAction').post((req, res, next) => {
  const { namespace, actionName, code, packageName, token } = req.body;
  const params = { code };
  const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${namespace}/actions/${packageName}/${actionName}`;
  axios
    .get(url, { params })
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

router.route('/createAction').post((req, res, next) => {
  const { action, overwrite, packageName, token } = req.body;
  const params = { overwrite };
  const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${action.namespace}/actions/${packageName}/${action.name}`;
  axios
    .put(url, { ...action }, { params })
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
          case 413:
            return res.status(413).json(response.data);
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

router.route('/deleteAction').post((req, res, next) => {
  const { namespace, actionName, packageName, token } = req.body;
  const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${namespace}/actions/${packageName}/${actionName}`;
  axios
    .delete(url)
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
          case 413:
            return res.status(413).json(response.data);
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

module.exports = router;
