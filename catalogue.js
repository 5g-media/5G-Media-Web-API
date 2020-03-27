const axios = require('axios');
const FormData = require('form-data');

/**
 * @module Catalogue
 */

/**
 * Represents a create NSD.
 * @param {file} nsd - nsd yaml file
 * @return {string}
 */
exports.createNSD = ({ nsd }) => {
  return new Promise(resolve => {
    const resourceUrl = `http://${process.env.CATALOGUE_IP}:${process.env.CATALOGUE_PORT}/nsd/v1/ns_descriptors`;
    const headers = {
      accept: 'application/json'
    };
    axios
      .post(resourceUrl, { headers })
      .then(response => {
        const nsdInfoId = response.data.id;
        const contentUrl = `http://${process.env.CATALOGUE_IP}:${process.env.CATALOGUE_PORT}/nsd/v1/ns_descriptors/${nsdInfoId}/nsd_content`;
        let formData = new FormData();
        formData.append('file', nsd);
        axios
          .put(contentUrl, formData, {
            headers: { ...formData.getHeaders(), accept: 'application/json' }
          })
          .then(res => {
            resolve(res.data);
          })
          .catch(error => {
            if (error.response) {
              resolve(error.response.data);
            } else {
              resolve(error);
            }
          });
      })
      .catch(error => {
        if (error.response) {
          resolve(error.response.data);
        } else {
          resolve(error);
        }
      });
  });
};

/**
 * Represents a NSD List.
 * @return {array<NSD>}
 */
exports.getNSDList = () => {
  return new Promise(resolve => {
    const url = `http://${process.env.CATALOGUE_IP}:${process.env.CATALOGUE_PORT}/nsd/v1/ns_descriptors`;
    const headers = {
      accept: 'application/json'
    };
    axios
      .get(url, headers)
      .then(response => {
        switch (response.status) {
          case 200:
            resolve(response.data);
        }
      })
      .catch(error => {
        if (error.response) {
          resolve(error.response.data);
        } else {
          resolve(error);
        }
      });
  });
};

/**
 * Represents a retrive single NSD.
 * @param {string} nsdInfoId - nsd ID
 * @return {NSD}
 */
exports.getNSD = ({ nsdInfoId }) => {
  return new Promise(resolve => {
    const url = `http://${process.env.CATALOGUE_IP}:${process.env.CATALOGUE_PORT}/nsd/v1/ns_descriptors/${nsdInfoId}`;
    const headers = {
      accept: 'application/json'
    };
    axios
      .get(url, headers)
      .then(response => {
        switch (response.status) {
          case 200:
            resolve(response.data);
        }
      })
      .catch(error => {
        if (error.response) {
          resolve(error.response.data);
        } else {
          resolve(error);
        }
      });
  });
};

/**
 * Represents a create VNFD.
 * @param {file} vnfd - vnfd archive in CSAR format
 * @return {string}
 */
exports.createVNFD = ({ vnfd }) => {
  return new Promise(resolve => {
    const resourceUrl = `http://${process.env.CATALOGUE_IP}:${process.env.CATALOGUE_PORT}/vnfpkgm/v1/vnf_packages`;
    const headers = {
      accept: 'application/json'
    };
    axios
      .post(resourceUrl, { headers })
      .then(response => {
        const vnfPkgId = response.data.id;
        const contentUrl = `http://${process.env.CATALOGUE_IP}:${process.env.CATALOGUE_PORT}/vnfpkgm/v1/vnf_packages/${vnfPkgId}/package_content`;
        let formData = new FormData();
        formData.append('file', vnfd);
        axios
          .put(contentUrl, formData, {
            headers: { ...formData.getHeaders(), accept: 'application/json' }
          })
          .then(res => {
            resolve(res.data);
          })
          .catch(error => {
            if (error.response) {
              resolve(error.response.data);
            } else {
              resolve(error);
            }
          });
      })
      .catch(error => {
        if (error.response) {
          resolve(error.response.data);
        } else {
          resolve(error);
        }
      });
  });
};

/**
 * Represents a VNFD List.
 * @return {array<VNFD>}
 */
exports.getVNFDList = () => {
  return new Promise(resolve => {
    const url = `http://${process.env.CATALOGUE_IP}:${process.env.CATALOGUE_PORT}/vnfpkgm/v1/vnf_packages`;
    const headers = {
      accept: 'application/json'
    };
    axios
      .get(url, headers)
      .then(response => {
        switch (response.status) {
          case 200:
            resolve(response.data);
        }
      })
      .catch(error => {
        if (error.response) {
          resolve(error.response.data);
        } else {
          resolve(error);
        }
      });
  });
};

/**
 * Represents a retrive single VNFD.
 * @param {string} vnfPkgId - vnfd ID
 * @return {VNFD}
 */
exports.getVNFD = ({ vnfPkgId }) => {
  return new Promise(resolve => {
    const url = `http://${process.env.CATALOGUE_IP}:${process.env.CATALOGUE_PORT}/vnfpkgm/v1/vnf_packages/${vnfPkgId}`;
    const headers = {
      accept: 'application/json'
    };
    axios
      .get(url, headers)
      .then(response => {
        switch (response.status) {
          case 200:
            resolve(response.data);
        }
      })
      .catch(error => {
        if (error.response) {
          resolve(error.response.data);
        } else {
          resolve(error);
        }
      });
  });
};
