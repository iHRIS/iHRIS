var axios = require("axios");
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

module.exports = {
  getDefinition: (resourceType, resourceId, callback) => {
    axios.get(`${config.fhir.server}/fhir/${resourceType}/${resourceId}`, {
      params: {},
      withCredentials: true,
      auth: {
        username: config.fhir.username,
        password: config.fhir.password
      }
    }).then(response => {
      return callback(false, response.data)
    }).catch(err => {
      return callback(err, false)
    });
  }
}