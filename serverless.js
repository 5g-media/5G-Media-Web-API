var axios = require("axios");
var https = require("https");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

/**
 * @module Faas
 */

/**
 * Represents a Faas Action List.
 * @param {string} namespace - The entity namespace.
 * @param {int} limit - Number of entities to include in the result (0-200). The default limit is 30. A value of 0 sets the limit to the maximum.
 * @param {boolean} skip - Number of entities to skip in the result.
 * @param {string} token - faas access token.
 * @return {array<ActionResponse>} Array of Action Model
 */
exports.getActions = (namespace, limit, skip, token) => {
  return new Promise(resolve => {
    const params = { limit, skip };
    const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${namespace}/actions`;
    axios
      .get(url, { params })
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
 * Represents a requested Faas Action.
 * @param {string} namespace - The entity namespace.
 * @param {int} actionName - Name of action to fetch
 * @param {boolean} code - Include action code in the result
 * @param {string} packageName - Name of package that contains action
 * @param {string} token - faas access token.
 * @return {ActionResponse} Action Model
 */
exports.getSingleAction = (namespace, actionName, code, packageName, token) => {
  return new Promise(resolve => {
    const params = { code };
    const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${namespace}/actions/${packageName}/${actionName}`;
    axios
      .get(url, { params })
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
 * Represents a Create Faas Action.
 * @param {string} action - The action being updated
 * @param {int} overwrite - Overwrite item if it exists. Default is false
 * @param {string} packageName - Name of package that contains action
 * @param {string} token - faas access token.
 * @return {ActionResponse} Action Model
 */
exports.createAction = (action, overwrite, packageName, token) => {
  return new Promise(resolve => {
    const params = { overwrite };
    const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${action.namespace}/actions/${packageName}/${action.name}`;
    axios
      .put(url, { ...action }, { params })
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
            case 413:
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
 * Represents a Delete Faas Action.
 * @param {string} namespace - The entity namespace
 * @param {int} actionName - Name of action to fetch
 * @param {string} packageName - Name of package that contains action
 * @param {string} token - faas access token.
 * @return {string} 200 Deleted Item
 */
exports.deleteAction = (namespace, actionName, packageName, token) => {
  return new Promise(resolve => {
    const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${namespace}/actions/${packageName}/${actionName}`;
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
            case 404:
              resolve(error.response.data);
            case 413:
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
 * Path Name model.
 * @typedef {Object} PathName
 * @property {string} path
 * @property {string} name
 */

/**
 * Rules response model.
 * @typedef {Object} Rule
 * @property {string} namespace
 * @property {string} name
 * @property {string} version
 * @property {boolean} publish
 * @property {array<string>} annotations
 * @property {string} status
 * @property {PathName} trigger
 * @property {PathName} action
 */

/**
 * Represents a requested Faas Rules.
 * @param {string} namespace - The entity namespace.
 * @param {int} limit - Number of entities to include in the result (0-200). The default limit is 30. A value of 0 sets the limit to the maximum.
 * @param {boolean} skip - Number of entities to skip in the result.
 * @param {string} token - faas access token.
 * @return {array<Rule>} Rule
 */
exports.getRules = (namespace, limit, skip, token) => {
  return new Promise(resolve => {
    const params = { limit, skip };
    const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${namespace}/rules`;
    axios
      .get(url, { params })
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
 * Represents a requested Faas Rule.
 * @param {string} namespace - The entity namespace.
 * @param {int} ruleName - Name of rule to fetch
 * @return {Rule} Rule
 */
exports.getSingleRule = (namespace, ruleName, token) => {
  return new Promise(resolve => {
    const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${namespace}/rules/${ruleName}`;
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
 * Represents a create new Faas Rule.
 * @param {string} namespace - The entity namespace.
 * @param {int} ruleName - Name of rule to update
 * @param {string} overwrite - Overwrite item if it exists. Default is false.
 * @param {Rule} rule - The rule being updated
 * @param {string} token - faas access token.
 * @return {Rule} Rule
 */
exports.createRule = (namespace, ruleName, overwrite, rule, token) => {
  return new Promise(resolve => {
    const params = { overwrite };
    const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${namespace}/rules/${ruleName}`;
    axios
      .put(url, { params }, { ...rule })
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
            case 404:
              resolve(error.response.data);
            case 409:
              resolve(error.response.data);
            case 413:
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
 * Represents a delete Faas Rule.
 * @param {string} namespace - The entity namespace.
 * @param {int} ruleName - Name of rule to delete
 * @return {Rule} Rule
 */
exports.deleteRule = (namespace, ruleName, token) => {
  return new Promise(resolve => {
    const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${namespace}/rules/${ruleName}`;
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
 * Trigger Limits model.
 * @typedef {Object} TriggerLimits
 * @property {string} description
 */

/**
 * Trigger response model.
 * @typedef {Object} Trigger
 * @property {string} namespace
 * @property {string} name
 * @property {string} version
 * @property {boolean} publish
 * @property {array<string>} annotations
 * @property {array<string>} parameters
 * @property {TriggerLimits} trigger
 * @property {Rule} rules
 * @property {integer} updated
 */

/**
 * Represents a requested Faas Triggers.
 * @param {string} namespace - The entity namespace.
 * @param {int} limit - Number of entities to include in the result (0-200). The default limit is 30. A value of 0 sets the limit to the maximum.
 * @param {boolean} skip - Number of entities to skip in the result.
 * @param {string} token - faas access token.
 * @return {array<Trigger>} Trigger
 */
exports.getTriggers = (namespace, limit, skip, token) => {
  return new Promise(resolve => {
    const params = { limit, skip };
    const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${namespace}/triggers`;
    axios
      .get(url, { params })
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
 * Represents a requested Faas Trigger.
 * @param {string} namespace - The entity namespace.
 * @param {int} triggerName - Name of trigger to fetch
 * @return {Trigger} Trigger
 */
exports.getSingleTrigger = (namespace, triggerName, token) => {
  return new Promise(resolve => {
    const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${namespace}/triggers/${triggerName}`;
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
 * Represents a create new Faas Trigger.
 * @param {string} namespace - The entity namespace.
 * @param {int} triggerName - Name of trigger to update
 * @param {string} overwrite - Overwrite item if it exists. Default is false.
 * @param {Trigger} trigger - The trigger being updated
 * @param {string} token - faas access token.
 * @return {Trigger} Trigger
 */
exports.createTrigger = (namespace, triggerName, overwrite, trigger, token) => {
  return new Promise(resolve => {
    const params = { overwrite };
    const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${namespace}/triggers/${triggerName}`;
    axios
      .put(url, { params }, { ...trigger })
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
            case 404:
              resolve(error.response.data);
            case 409:
              resolve(error.response.data);
            case 413:
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
 * Represents a delete Faas Trigger.
 * @param {string} namespace - The entity namespace.
 * @param {int} triggerName - Name of trigger to delete
 * @return {Trigger} Trigger
 */
exports.deleteTrigger = (namespace, triggerName, token) => {
  return new Promise(resolve => {
    const url = `https://${token}@${process.env.SERVERLESS_IP}:${process.env.SERVERLESS_PORT}/api/v1/namespaces/${namespace}/triggers/${triggerName}`;
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
