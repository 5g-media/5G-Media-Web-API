var axios = require("axios");

/**
 * @module CNO
 */

/**
 * Training Data model.
 * @typedef {Object} trainData
 * @property {string} alpha
 * @property {string} trafficPattern
 * @property {string} actorLearningRatio
 * @property {string} criticLearningRatio
 * @property {string} linkCapacity
 * @property {string} rewardFunction
 * @property {string} uploadFileName
 * @property {string} parallelAgent
 */

/**
 * Represents a starting CNO training.
 * @param {trainData} trainData - train data model.
 * @return {string} OK
 */

exports.trainData = trainModel => {
  return new Promise(resolve => {
    const url = `http://${process.env.CNO_IP}:${process.env.CNO_PORT}/trainData`;
    axios
      .post(url, { trainModel })
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
 * Represents a stop CNO training.
 * @return {string} OK
 */
exports.stopTraining = () => {
  return new Promise(resolve => {
    const url = `http://${process.env.CNO_IP}:${process.env.CNO_PORT}/shutdown`;
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
 * Represents start tenserboard according to CNO training.
 * @return {string} OK
 */
exports.startTensorboard = () => {
  return new Promise(resolve => {
    const url = `http://${process.env.CNO_IP}:${process.env.CNO_PORT}/tensorboard`;
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
 * Represents a deploy trained application to MAPE.
 * @return {string} OK
 */
exports.deployMape = () => {
  return new Promise(resolve => {
    const url = `http://${process.env.CNO_IP}:${process.env.CNO_PORT}/deployMape`;
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
            default:
              resolve(error.response.data);
          }
        } else {
          resolve(error);
        }
      });
  });
};
