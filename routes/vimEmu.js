const express = require('express');
const router = express.Router();
const axios = require('axios');

router.route('/listDatacenters').post((req, res, next) => {
  const url = `http://${process.env.VIM_EMU_IP}:${process.env.VIM_EMU_PORT}/restapi/datacenter`;
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
            return res.status(400).json(error.response.data);
          case 403:
            return res.status(401).json(error.response.data);
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

router.route('/getVNFinfo').post((req, res, next) => {
  const { dc_label } = req.body;
  const url = `http://${process.env.VIM_EMU_IP}:${process.env.VIM_EMU_PORT}/restapi/datacenter/${dc_label}`;
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
            return res.status(400).json(error.response.data);
          case 403:
            return res.status(401).json(error.response.data);
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

router.route('/deleteVNF').post((req, res, next) => {
  const { dc_label, compute_name } = req.body;
  const url = `http://${process.env.VIM_EMU_IP}:${process.env.VIM_EMU_PORT}/restapi/compute/${dc_label}/${compute_name}`;
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
            return res.status(400).json(error.response.data);
          case 403:
            return res.status(401).json(error.response.data);
          default:
            return res.status(500).json(error.response.data);
        }
      } else {
        return res.status(500).json(error);
      }
    });
});

module.exports = router;
