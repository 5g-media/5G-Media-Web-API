var axios = require("axios");

/**
 * @module VimEmu
 */

/**
 * VimEmu Data Center Model
 * @typedef {Object} DataCenter
 * @property {string} internalname
 * @property {array} ext
 * @property {string} n_running_containers
 * @property {string} label
 * @property {string} switch
 * @property {array} vnf_list
 * @property {array} metadata
 */

/**
 * Represents a Data Center List.
 * @return {array<DataCenter>} DataCenter List
 */
exports.listDatacenters = () => {
  return new Promise(resolve => {
    const url = `http://${process.env.VIM_EMU_IP}:${process.env.VIM_EMU_PORT}/restapi/datacenter`;
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
 * Represents a requested Data Center.
 * @param {string} dc_label - Name of VNF
 * @return {DataCenter} DataCenter
 */
exports.getVNFinfo = dc_label => {
  return new Promise(resolve => {
    const url = `http://${process.env.VIM_EMU_IP}:${process.env.VIM_EMU_PORT}/restapi/datacenter/${dc_label}`;
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
 * Represents a requested Data Center.
 * @param {string} dc_label - Name of VNF
 * @param {string} compute_name - Compute Name of VNF
 * @return {string} Deleted
 */
exports.deleteVNF = (dc_label, compute_name) => {
  return new Promise(resolve => {
    const url = `http://${process.env.VIM_EMU_IP}:${process.env.VIM_EMU_PORT}/restapi/compute/${dc_label}/${compute_name}`;
    axios
      .delete(url)
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
 * Represents a create the action that monitors the counters of a VNF interface..
 * @param {string} vnf_name - Name of the VNF to be monitored
 * @param {string} vnf_interface - Name of the VNF interface to be monitored
 * @param {string} metric - One of the following metrics:[tx_bytes, rx_bytes, tx_packets, rx_packets]
 * @return {string} OK
 */
exports.createMonitoring = (vnf_name, vnf_interface, metric) => {
  return new Promise(resolve => {
    const params = { vnf_name, vnf_interface, metric };
    const url = `http://${process.env.VIM_EMU_IP}:${process.env.VIM_EMU_PORT}/restapi/monitor/interface`;
    axios
      .put(url, { params })
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

/**
 * Represents a delete the action that monitors the counters of a VNF interface.
 * @param {string} vnf_name - Name of the VNF to be monitored
 * @param {string} vnf_interface - Name of the VNF interface to be monitored
 * @param {string} metric - One of the following metrics:[tx_bytes, rx_bytes, tx_packets, rx_packets]
 * @return {string} OK
 */
exports.deleteMonitoring = (vnf_name, vnf_interface, metric) => {
  return new Promise(resolve => {
    const params = { vnf_name, vnf_interface, metric };
    const url = `http://${process.env.VIM_EMU_IP}:${process.env.VIM_EMU_PORT}/restapi/monitor/interface`;
    axios
      .delete(url, { params })
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
